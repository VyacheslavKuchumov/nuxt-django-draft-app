// server/api/customers/index.ts
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {

  const customers = await prisma.customers.findMany()
  return customers
})