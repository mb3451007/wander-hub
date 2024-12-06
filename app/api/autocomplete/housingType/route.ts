import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('like') ?? ''
  const housingTypes = await client.housingType.findMany({
    where: {
      OR: [
        { id: { contains: query, mode: 'insensitive' } },
        { russianName: { contains: query, mode: 'insensitive' } },
        { englishName: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 5,
  })

  return Response.json(housingTypes)
}
