import { Location } from '@prisma/client'

export async function getLocations(query: string): Promise<Location[]> {
  const response = await fetch(`/api/autocomplete/location?like=${query}`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await response.json()
  return body as Location[]
}
