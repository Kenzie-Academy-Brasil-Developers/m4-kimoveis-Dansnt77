import { Address, Category, RealEstate } from "../entities";
import { realEstateCreate, realEstateList } from "../interfaces/realEstate.interfaces";
import realEstateRepository from "../repositories/realEstate.repository";
import addressRepository from "../repositories/address.repository";
import categoryRepository from "../repositories/category.repository";


const createRealEstate = async(payload: realEstateCreate ): Promise<RealEstate> => {
    const addressNew: Address = addressRepository.create(payload.address)
    await addressRepository.save(addressNew)
    const categoryFind = await categoryRepository.findOneBy({ id: payload.categoryId})

    const realEstate: RealEstate = realEstateRepository.create({
       value: payload.value,
       size: payload.size,
       address: addressNew,
       category: categoryFind!,
    })
    
    await realEstateRepository.save(realEstate)

    return realEstate
}

const readRealEstate = async(): Promise<realEstateList> => {
    const realEstate: Array<RealEstate> = await realEstateRepository.find({
        relations:{
            address: true
        }
    })

    return realEstate
}
export { createRealEstate, readRealEstate }
