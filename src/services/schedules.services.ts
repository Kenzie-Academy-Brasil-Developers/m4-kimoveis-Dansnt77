import { RealEstate, Schedule } from "../entities";
import { AppError } from "../errors/App.error";
import { ScheduleCreate } from "../interfaces/schedules.interfaces";
import realEstateRepository from "../repositories/realEstate.repository";
import schedulesRepository from "../repositories/schedules.repository";

const createSchedule = async (payload: ScheduleCreate, tokenId: number): Promise<Schedule> => {
    const queryBuilder = await schedulesRepository.createQueryBuilder('schedule')
        .where('schedule.date = :date', { date: payload.date })
        .andWhere('schedule.hour = :hour', { hour: payload.hour })
        .andWhere('schedule.realEstateId = :realEstateId', { realEstateId: payload.realEstateId })
        .getOne()
    const existingSchedule = queryBuilder;


    if (existingSchedule) {
        throw new AppError("Schedule to this real estate at this date and time already exists", 409);
    }

    const userQueryBuilder = await schedulesRepository.createQueryBuilder('schedule')
    .where('schedule.userId = :userId', { userId: tokenId })
    .andWhere('schedule.hour = :hour', { hour: payload.hour})
    .andWhere('schedule.date = :date', { date: payload.date})
    .getOne()

    if(userQueryBuilder){
        throw new AppError("User schedule to this real estate at this date and time already exists", 409)
    }

    const appointmentHour = parseInt(payload.hour.split(':')[0], 10);
  
    if (appointmentHour < 8 || appointmentHour >= 18) {
      throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }

    const appointmentDate = new Date(payload.date);
  
  if (appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) {
    throw new AppError('Invalid date, work days are monday to friday', 400);
  }


    const realEstate = await realEstateRepository.findOne({
        where: { id: payload.realEstateId },
    });

    if (!realEstate) {
        throw new AppError('RealEstate not found', 404);
    }

    const newSchedule = schedulesRepository.create({
        date: payload.date,
        hour: payload.hour,
        realEstate: { id: payload.realEstateId },
        user: { id: tokenId },
    });

    await schedulesRepository.save(newSchedule);

    return newSchedule;
};

const readSchedules = async(realEstateId: number): Promise<RealEstate> => {
    const realEstate = await realEstateRepository.findOne({
        where: {
            id: realEstateId
        },
        relations: {
            schedules: {user: true},
            address: true,
            category: true
        }
    })

    if(!realEstate) {
        throw new AppError("RealEstate not found", 404)
    }
    
    return realEstate
}

export { createSchedule, readSchedules } 