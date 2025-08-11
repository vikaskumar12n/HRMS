import { useState } from "react";
import { useNavigate } from "react-router-dom";
import theme from "@material-tailwind/react/theme";


const TableComponent = ({ columns, data, title, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
   const navigator=useNavigate(); 
  const totalPages =Math.ceil(data?.length / itemsPerPage);

  // 🟢 Get paginated data
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="w-full p-2  shadow-md bg-white">

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#131212] text-white">
              <th className="border border-gray-300 p-2 text-center w-16">S.No.</th>
              {columns.map((col, index) => (
                <th key={index} className="border border-gray-300 p-3 text-left">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition duration-200">
                <td className="border border-gray-300 p-2 text-center font-semibold text-black">
                  {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                </td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 p-3 text-black">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center mt-4 space-x-2">
          <button
            className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
