-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('email', 'telegram', 'phone');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('housing', 'bike');

-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('sale', 'leasing', 'daily_rental', 'monthly_rental', 'yearly_rental', 'rental');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('euro', 'us_dollar', 'indonesian_rupiah');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('picture', 'video');

-- CreateEnum
CREATE TYPE "BikeType" AS ENUM ('supersport', 'scooter', 'chopper');

-- CreateTable
CREATE TABLE "UserDetails" (
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ContactDetails" (
    "userId" UUID NOT NULL,
    "contactType" "ContactType" NOT NULL,
    "contact" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "russianName" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "listingId" UUID NOT NULL,
    "listingType" "ListingType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("listingId")
);

-- CreateTable
CREATE TABLE "ListingOffer" (
    "listingId" UUID NOT NULL,
    "price" INTEGER NOT NULL,
    "offerType" "OfferType" NOT NULL,
    "currency" "Currency" NOT NULL
);

-- CreateTable
CREATE TABLE "HousingType" (
    "id" TEXT NOT NULL,
    "russianName" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,

    CONSTRAINT "HousingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingMedia" (
    "listingId" UUID NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "nsfwScore" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "HousingDetails" (
    "listingId" UUID NOT NULL,
    "bedroomCount" INTEGER NOT NULL,
    "bathroomCount" INTEGER NOT NULL,
    "kitchenCount" INTEGER NOT NULL,
    "storeyCount" INTEGER NOT NULL,
    "locationId" TEXT NOT NULL,
    "totalAreaInM2" INTEGER NOT NULL,
    "petsAllowed" BOOLEAN NOT NULL,
    "constructionNearBy" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "pool" BOOLEAN NOT NULL,
    "availabilityDate" TIMESTAMP(3),
    "housingTypeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BikeDetails" (
    "listingId" UUID NOT NULL,
    "firstRegistrationYear" INTEGER NOT NULL,
    "modelYear" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" "BikeType" NOT NULL,
    "color" TEXT NOT NULL,
    "engineVolume" DOUBLE PRECISION NOT NULL,
    "enginePowerInHP" INTEGER NOT NULL,
    "absAvailable" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetails_contactType_contact_key" ON "ContactDetails"("contactType", "contact");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetails_userId_contactType_key" ON "ContactDetails"("userId", "contactType");

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_listingId_key" ON "Listing"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "ListingOffer_listingId_offerType_key" ON "ListingOffer"("listingId", "offerType");

-- CreateIndex
CREATE UNIQUE INDEX "HousingType_id_key" ON "HousingType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ListingMedia_mediaUrl_key" ON "ListingMedia"("mediaUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ListingMedia_listingId_mediaUrl_key" ON "ListingMedia"("listingId", "mediaUrl");

-- CreateIndex
CREATE UNIQUE INDEX "HousingDetails_listingId_key" ON "HousingDetails"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "BikeDetails_listingId_key" ON "BikeDetails"("listingId");

-- AddForeignKey
ALTER TABLE "ContactDetails" ADD CONSTRAINT "ContactDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDetails"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingOffer" ADD CONSTRAINT "ListingOffer_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("listingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingMedia" ADD CONSTRAINT "ListingMedia_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("listingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingDetails" ADD CONSTRAINT "HousingDetails_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("listingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingDetails" ADD CONSTRAINT "HousingDetails_housingTypeId_fkey" FOREIGN KEY ("housingTypeId") REFERENCES "HousingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingDetails" ADD CONSTRAINT "HousingDetails_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeDetails" ADD CONSTRAINT "BikeDetails_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("listingId") ON DELETE RESTRICT ON UPDATE CASCADE;
