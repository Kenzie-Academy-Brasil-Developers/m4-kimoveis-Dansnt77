import { z } from "zod";
import { realEstateCreateSchema, realEstateSchema, realEstateSchemaArray } from "../schemas/realEstate.schemas";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";

type IRealEstate = z.infer<typeof realEstateSchema>
type realEstateCreate = z.infer<typeof realEstateCreateSchema>
type realEstateRepo = Repository<RealEstate>
type realEstateList = z.infer<typeof realEstateSchemaArray>

export { IRealEstate, realEstateCreate, realEstateRepo, realEstateList }
