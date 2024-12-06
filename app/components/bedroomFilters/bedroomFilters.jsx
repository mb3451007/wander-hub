import React, { useState } from "react";
import styles from "./bedroomFilters.module.scss";

export default function BedroomFilters({onChange}) {
  // Filters data
  const filtersData = [
    { key: "any", label: "Any" },
    { key: "oneBedroom", label: "1 Bedroom" },
    { key: "twoBedrooms", label: "2 Bedrooms" },
    { key: "threeBedrooms", label: "3 Bedrooms" },
    { key: "fourPlusBedrooms", label: "4 and more" },
  ];

  // State to track which checkboxes are selected
  const [selectedFilters, setSelectedFilters] = useState({});

  // Handle toggle function
  const handleToggle = (key) => {
    setSelectedFilters((prevState) => {
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
    <div className={styles.container}>

    <div className={styles.container__filterContainer}>
      <div className={styles.container__filterContainer__header}>Bedrooms</div>
      <div className={styles.container__filterContainer__filters}>
        {filtersData.map((filter) => (
          <div
            key={filter.key}
            className={styles.container__filterContainer__filters__filter}
          >
            <div
              className={styles.container__filterContainer__filters__filter__checkbox}
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
            <div className={styles.container__filterContainer__filters__filter__name}>
              {filter.label}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
