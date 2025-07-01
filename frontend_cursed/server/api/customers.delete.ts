
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const customer = await prisma.customers.delete({
        where: { customer_id: body.customer_id }
    })
    return customer
})