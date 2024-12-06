// type ListingType = "apartment" | "villa" | "office"
interface Money {
  currencyISO: "USD" | "IDR"
  value: number
}

export interface ListingDTO {
  id: string
  imageURL: string
  isFavorite: boolean
  title: string
  roomCount: number
  bathroomCount: number
  location: string
  listingType: string
  lowestOffer: {
    price: Money,
    duration: "day" | "month" | "year"
  },
}
