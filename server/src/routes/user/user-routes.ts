import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { createUser } from "./create-user"
import { getUsers } from "./get-users"
import { getUserById } from "./get-user"
import { updateUser } from "./update-user"
import { deleteUser } from "./delete-user"
import { createDoneeRequest } from "./create-donee-request"
import { getDoneeRequests } from "./get-donee-requests"
import { deleteDoneeRequest } from "./delete-donee-request"
import { getDoneeRequest } from "./get-donee-request"
import { getAcceptDoneeRequest } from "./get-accept-donee-request"

export async function userRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(createUser)
        .register(getUsers)
        .register(getUserById)
        .register(updateUser)
        .register(deleteUser)
        .register(createDoneeRequest)
        .register(getDoneeRequests)
        .register(getDoneeRequest)
        .register(deleteDoneeRequest)
        .register(getAcceptDoneeRequest)
}