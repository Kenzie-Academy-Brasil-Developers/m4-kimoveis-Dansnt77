import { z } from "zod";
import { addressSchema, addressesCreateSchema } from "./address.schemas";
import { categoryIdSchema, categorySchema } from "./category.schemas";

const realEstateSchema = z.object({
    id: z.number(),
    value: z.string().or(z.number().positive()),
    size: z.number().int().positive(),
    address: addressSchema,
    category: categorySchema,
    sold: z.boolean().default(false),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
})

const realEstateCreateSchema = z.object({
    value: z.string().or(z.number().positive()),
    size: z.number().int().positive(),
    address: addressesCreateSchema,
    categoryId: z.number(),
})

const realEstateSchemaArray = z.array(realEstateSchema)

export { realEstateCreateSchema, realEstateSchema, realEstateSchemaArray }