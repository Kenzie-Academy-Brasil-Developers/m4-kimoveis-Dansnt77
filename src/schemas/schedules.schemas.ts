import { z } from "zod";

const schedule = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number(),
    userId: z.number()
})

const scheduleCreateSchema = schedule.omit({id: true, userId: true})

export { schedule, scheduleCreateSchema }

