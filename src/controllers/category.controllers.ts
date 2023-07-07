import { Request, Response } from "express"
import { ICategory } from "../interfaces/category.interfaces"
import { createCategory, readCategory, realEstateForReadCategory } from "../services/category.services"

const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const category: ICategory = await createCategory(req.body)
    return res.status(201).json(category)
}

const readCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const categories = await readCategory()
    return res.status(200).json(categories)
}

const realEstateForReadCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(req.params.id)

    const realEstateforCategory = await realEstateForReadCategory(userId)
    
    return res.status(200).json(realEstateforCategory)
    
}

export { createCategoryController, readCategoryController, realEstateForReadCategoryController }