
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const customer = await prisma.customers.update({
        where: {  customer_id: body.customer_id },
        data: body
    })
    return customer
})