import React, { useState, useEffect } from "react";
import { supabaseService } from "./services/supabaseService";

const TableComponent = ({ entityStructure }) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchData();
  }, [page, pageSize, filters]);

  const fetchData = async () => {
    const { data, count } = await supabaseService.getEntities(
      entityStructure.name,
      page,
      pageSize,
      filters,
    );
    setData(data);
    setTotalCount(count);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div>
      <QueryComponent
        entityStructure={entityStructure}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            {entityStructure.displayFields.map((field) => (
              <th key={field.name} className="px-4 py-2">
                {field.label}
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {entityStructure.displayFields.map((field) => (
                <td
                  key={`${row.id}-${field.name}`}
                  className="border px-4 py-2"
                >
                  {field.type === "relation"
                    ? field.relatedData.find(
                        (option) => option.value === row[field.name],
                      )?.label
                    : row[field.name]}
                </td>
              ))}
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(row.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <div>
          <span className="mr-2">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
            className="border rounded py-1 px-2"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>
          <span className="mr-2">Page:</span>
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded mr-2"
          >
            Prev
          </button>
          <span className="mr-2">{page}</span>
          <button
            disabled={page === Math.ceil(totalCount / pageSize)}
            onClick={() => handlePageChange(page + 1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
