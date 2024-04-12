import React, { useState } from "react";
import FormComponent from "../../core/components/FormComponent";
import { supabaseService } from "../../core/services/supabaseService";

const UserForm = () => {
  const [formData, setFormData] = useState(null);

  const entityStructure = {
    name: "users",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "age", label: "Age", type: "number" },
      {
        name: "role",
        label: "Role",
        type: "relation",
        relatedData: [
          { value: "1", label: "Admin" },
          { value: "2", label: "User" },
        ],
      },
      {
        name: "permissions",
        label: "Permissions",
        type: "relation",
        multiple: true,
        relatedData: [
          { value: "read", label: "Read" },
          { value: "write", label: "Write" },
          { value: "delete", label: "Delete" },
        ],
      },
      { name: "isActive", label: "Active", type: "checkbox" },
    ],
  };

  const handleFormSubmit = async (data) => {
    try {
      if (formData) {
        // Update existing entity
        await supabaseService.updateEntity("users", formData.id, data);
      } else {
        // Create new entity
        await supabaseService.createEntity("users", data);
      }
      // Reset form data after successful submission
      setFormData(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const { data } = await supabaseService.getEntities("users", 1, 1, { id });
      setFormData(data[0]);
    } catch (error) {
      console.error("Error fetching entity:", error);
    }
  };

  return (
    <div>
      <h2>{formData ? "Edit User" : "Create User"}</h2>
      <FormComponent
        initialData={formData}
        entityStructure={entityStructure}
        onSubmit={handleFormSubmit}
      />
      <button onClick={() => handleEditClick(1)}>Edit User 1</button>
    </div>
  );
};

export default UserForm;
