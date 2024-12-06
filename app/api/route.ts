import { PrismaClient } from '@prisma/client'
export async function GET() {
  const client = new PrismaClient()
  const housesWithPool = await client.housingDetails.findMany({
    where: {
      listing: {
        active: true,
      },
      location: {
        country: 'Indonesia',
      },
      pool: true,
    },
  })
  return Response.json(housesWithPool)
}
