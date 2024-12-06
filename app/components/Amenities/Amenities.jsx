import React, { useState } from 'react';
import styles from './Amenities.module.scss';

export default function Amenities({ onChange }) {
    // Array to manage the checked state of each checkbox
    const [checkedStates, setCheckedStates] = useState({}); // Adjust length to match the number of checkboxes


    const amenities = [
        { key: "AirConditioning", label: "Air Conditioning" },
        { key: "AssistedLiving", label: "Assisted Living" },
        { key: "DedicatedWorkspace", label: "Dedicated Workspace" },
        { key: "DisabilityAccess", label: "Disability Access" },
        { key: "Cleanings", label: "Cleanings" },
        { key: "Kitchen", label: "Kitchen" },
        { key: "Garage", label: "Garage" },
        { key: "TV", label: "TV" },
        { key: "SwimmingPool", label: "Swimming Pool" },
        { key: "Wifi", label: "Wi-fi" },
      ];

    const handleCheckboxChange = (key) => {
        setCheckedStates((prevState) => {
          const newState = { ...prevState, [key]: !prevState[key] };
          const selectedLabels = Object.entries(newState)
      .filter(([key, value]) => value) 
      .map(([key]) => amenities.find((item) => item.key === key)?.label);

      if (onChange) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onChange(selectedLabels);
      }
            return newState;
          
        });
      };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterContainer__header}>
                Amenities
            </div>
            <div className={styles.filterContainer__filters}>
                {amenities.map((filter) => (
                    <div key={filter.key} className={styles.filterContainer__filters__filter}>
                        <div
                            className={styles.filterContainer__filters__filter__checkbox}
                            onClick={() => handleCheckboxChange(filter.key)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <rect
                                    x="0.5"
                                    y="1.45361"
                                    width="23"
                                    height="23"
                                    rx="3.5"
                                    stroke="black"
                                    fill= "none" // Change background on check
                                />
                            </svg>
                            {checkedStates[filter.key] && (
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
