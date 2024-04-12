import React, { useState } from "react";

const MultiSelectComponent = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (selectedValue) => {
    const currentValue = value || [];
    const newValue = currentValue.includes(selectedValue)
      ? currentValue.filter((val) => val !== selectedValue)
      : [...currentValue, selectedValue];
    onChange(newValue);
  };

  return (
    <div className="relative inline-block w-full">
      <div
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-400 rounded shadow hover:border-gray-500 focus:outline-none focus:shadow-outline cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {value?.length > 0
            ? value
                .map((val) => options.find((opt) => opt.value === val).label)
                .join(", ")
            : "Select options"}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 3.414 6.293 6.707zM13.707 13.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 16.586l3.293-3.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-400 rounded shadow">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                value?.includes(option.value) ? "bg-gray-200" : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectComponent;
