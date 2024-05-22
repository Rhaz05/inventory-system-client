import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Button from "./Button";
const Table = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setFiltering,
  });

  return (
    <>
      <div className="flex justify-end relative p-2">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search"
          className="border border-gray-300 rounded py-2 px-4 
                  w-[15rem] h-[2.5rem] focus:outline-none
                  focus:border-teal-300"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaSearch className="text-teal-500 mr-2" size={20} />
        </div>
      </div>
      <div
        className="flex flex-col h-[33rem] overflow-y-auto scrollbar-thin
      scrollbar-thumb-slate-400/90 scrollbar-track-gray-100/75"
      >
        <table className="w-full">
          <thead className="bg-gray-100 text-left sticky top-0 z-1 flex-row">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex">
                        {flexRender(
                          header.column.columnDef.header,
                          header,
                          header.getContext()
                        )}
                        {
                          {
                            asc: <IoIosArrowRoundUp size={22} />,
                            desc: <IoIosArrowRoundDown size={22} />,
                          }[header.column.getIsSorted() ?? null]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-3 text-center">
                  No Data Matched
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex relative">
        <div className="flex mt-4 justify-center w-full">
          <p className="text-medium italic text-gray-600 mt-2">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
        </div>
        <div className="flex gap-2 mt-4 justify-end w-full">
          <Button
            name="first page"
            eventHandler={() => table.setPageIndex(0)}
          />
          <Button
            name={<MdKeyboardArrowLeft size={24} />}
            eventHandler={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          />
          <Button
            name={<MdKeyboardArrowRight size={24} />}
            eventHandler={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          />
          <Button
            name="last page"
            eventHandler={() => table.setPageIndex(table.getPageCount() - 1)}
            style="mr-8"
          />
        </div>
      </div>
    </>
  );
};

export default Table;
