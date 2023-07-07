import { z } from "zod";
import { schedule, scheduleCreateSchema } from "../schemas/schedules.schemas";
import { Repository } from "typeorm";
import { Schedule } from "../entities";

type ISchedule = z.infer<typeof schedule>
type ScheduleCreate = z.infer<typeof scheduleCreateSchema>
type ScheduleRepo = Repository<Schedule>

export { ISchedule, ScheduleCreate, ScheduleRepo }

