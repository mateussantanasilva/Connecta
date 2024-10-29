import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getUserById } from "./get-user"
import { deleteUser } from "./delete-user"
import { createDoneeRequest } from "./create-donee-request"

export async function userRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(getUserById)
        .register(deleteUser)
        .register(createDoneeRequest)
}