import React, { useState } from "react";
import styles from "./bathroomFilters.module.scss";

// eslint-disable-next-line react/prop-types
export default function BathroomFilters({ onChange }) {
  // Filters data
  const filtersData = [
    { key: "any", label: "Any" },
    { key: "oneBathroom", label: "1 Bathroom" },
    { key: "twoBathrooms", label: "2 Bathrooms" },
    { key: "threeBathrooms", label: "3 Bathrooms" },
    { key: "fourPlusBathrooms", label: "4 and more" },
  ];

  // State to track which checkboxes are selected
  const [selectedFilters, setSelectedFilters] = useState({});

  // Handle toggle function
  const handleToggle = (key) => {
    setSelectedFilters((prevState) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const newState = { ...prevState, [key]: !prevState[key] };
        const selectedLabels = Object.entries(newState)
      .filter(([key, value]) => value) 
      .map(([key]) => filtersData.find((item) => item.key === key)?.label);

      if (onChange) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onChange(selectedLabels);
      }
          return newState;
    });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContainer__header}>Bathrooms</div>
      <div className={styles.filterContainer__filters}>
        {filtersData.map((filter) => (
          <div
            key={filter.key}
            className={styles.filterContainer__filters__filter}
          >
            <div
              className={styles.filterContainer__filters__filter__checkbox}
              onClick={() => handleToggle(filter.key)}
            >
              {/* Unchecked box */}
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
              {/* Checked box */}
              {selectedFilters[filter.key] && (
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
              )}
            </div>
            <div className={styles.filterContainer__filters__filter__name}>
              {filter.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
