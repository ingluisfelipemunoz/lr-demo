import React, { useState } from "react";
import { DropdownComponent } from "./DropdownComponent";
import { MultiSelectComponent } from "./MultiSelectComponent";
const QueryComponent = ({ entityStructure, filters, onFiltersChange }) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    onFiltersChange({ ...filters, query: e.target.value });
  };

  const handleFilterChange = (fieldName, value) => {
    onFiltersChange({ ...filters, [fieldName]: value });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mb-4">
      <div className="flex items-center mb-2 md:mb-0">
        <label htmlFor="query" className="mr-2">
          Search:
        </label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={handleQueryChange}
          className="border rounded py-1 px-2"
        />
      </div>
      <div className="flex flex-wrap">
        {entityStructure.filterFields.map((field) => (
          <div key={field.name} className="mb-2 md:mb-0 md:mr-4">
            <label className="block text-gray-700 font-bold mb-1">
              {field.label}
            </label>
            {field.type === "relation" ? (
              field.multiple ? (
                <MultiSelectComponent
                  options={field.relatedData}
                  value={filters[field.name] || []}
                  onChange={(value) => handleFilterChange(field.name, value)}
                />
              ) : (
                <DropdownComponent
                  options={field.relatedData}
                  value={filters[field.name]}
                  onChange={(value) => handleFilterChange(field.name, value)}
                />
              )
            ) : (
              <input
                type="text"
                value={filters[field.name] || ""}
                onChange={(e) => handleFilterChange(field.name, e.target.value)}
                className="border rounded py-1 px-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryComponent;
