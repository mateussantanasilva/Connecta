import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { createUser } from "./create-user"
import { getUsers } from "./get-users"
import { getUserById } from "./get-user"
import { updateUser } from "./update-user"
import { deleteUser } from "./delete-user"

export async function userRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(createUser)
        .register(getUsers)
        .register(getUserById)
        .register(updateUser)
        .register(deleteUser)
}