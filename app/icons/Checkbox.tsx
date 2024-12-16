import React from 'react'

export default function Checkbox(checked: boolean) {
  if (checked === false) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <rect
          x="0.5"
          y="1.45361"
          width="23"
          height="23"
          rx="3.5"
          stroke="black"
        />
      </svg>
    )
  }

  if (checked === true) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4.16797 11.6667L6.86221 13.6873C7.21945 13.9553 7.7244 13.894 8.00718 13.5484L15.0013 5"
          stroke="black"
          strokeLinecap="round"
        />
      </svg>
    )
  }
}
