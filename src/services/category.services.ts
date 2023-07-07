import { Category } from "../entities";
import { AppError } from "../errors/App.error";
import { CategoryCreate, ICategory } from "../interfaces/category.interfaces";
import categoryRepository from "../repositories/category.repository";
import { categoryListSchema, categorySchema } from "../schemas/category.schemas";

const createCategory = async (payload: CategoryCreate): Promise<ICategory> => {
    const repo: Category = categoryRepository.create(payload)
    await categoryRepository.save(repo)

    return categorySchema.parse(repo)
}

const readCategory = async (): Promise<any> => {
    return categoryListSchema.parse(await categoryRepository.find())
}

const realEstateForReadCategory = async (userId: number): Promise<Category> => {
  
    const categoryWithRealEstate= await categoryRepository.findOne({
        where:{id:userId},
        relations: {realEstate: true},
    })

    if(!categoryWithRealEstate){
        throw new AppError("Category not found", 404)
    }

    return categoryWithRealEstate
}

export {createCategory, readCategory, realEstateForReadCategory}