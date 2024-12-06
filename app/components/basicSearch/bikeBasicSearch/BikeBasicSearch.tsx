import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BikeSearchParameters {}

interface BikeBasicSearchProps {
  onChange: (params: BikeSearchParameters) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BikeBasicSearch(props: BikeBasicSearchProps) {
  return <div>I&apos;m the bike tab</div>
}
