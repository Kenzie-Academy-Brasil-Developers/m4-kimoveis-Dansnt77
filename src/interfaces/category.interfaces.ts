import { z } from "zod";
import { categoryCreateSchema, categoryListSchema, categorySchema } from "../schemas/category.schemas";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entities";

type CategoryCreate = z.infer<typeof categoryCreateSchema>
type CategoryRepo = Repository<Category>
type CategoryList = z.infer<typeof categoryListSchema>
type ICategory = z.infer<typeof categorySchema>

export { CategoryRepo, CategoryCreate, CategoryList, ICategory }