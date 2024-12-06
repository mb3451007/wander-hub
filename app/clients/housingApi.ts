import { HousingType } from '@prisma/client'

export async function getHousingTypes(query: string): Promise<HousingType[]> {
  const response = await fetch(`/api/autocomplete/housingType?like=${query}`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await response.json()
  return body as HousingType[]
}
