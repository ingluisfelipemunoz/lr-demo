import React, { useState } from "react";
import DropdownComponent from "./DropdownComponent";
import MultiSelectComponent from "./MultiSelectComponent";
import { supabaseService } from "../services/supabaseService";

const FormComponent = ({ initialData, entityStructure }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleRelationChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call supabaseService to create or update data
    if (initialData) {
      await supabaseService.updateEntity(
        entityStructure.name,
        initialData.id,
        formData,
      );
    } else {
      await supabaseService.createEntity(entityStructure.name, formData);
    }
    // Reset form or handle success/error
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {entityStructure.fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-gray-700 font-bold mb-2"
          >
            {field.label}
          </label>
          {field.type === "relation" ? (
            field.multiple ? (
              <MultiSelectComponent
                options={field.relatedData}
                value={formData[field.name]}
                onChange={(value) => handleRelationChange(field.name, value)}
              />
            ) : (
              <DropdownComponent
                options={field.relatedData}
                value={formData[field.name]}
                onChange={(value) => handleRelationChange(field.name, value)}
              />
            )
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : field.type === "number" ? (
            <input
              type="number"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : field.type === "checkbox" ? (
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleInputChange}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
          ) : field.type === "radio" ? (
            field.options.map((option) => (
              <div key={option.value} className="form-radio">
                <input
                  type="radio"
                  id={`${field.name}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleInputChange}
                  className="form-radio h-5 w-5 text-gray-600"
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className="ml-2 text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))
          ) : (
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {initialData ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default FormComponent;
