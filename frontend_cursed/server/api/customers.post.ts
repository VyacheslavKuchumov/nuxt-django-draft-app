import prisma from "~/lib/prisma"
// server/api/customers.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const customer = await prisma.customers.create({
    data: body
  })
  return customer
})
