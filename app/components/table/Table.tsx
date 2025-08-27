import { ReactNode } from "react";

interface col {
  col: string;
  title: string;
}

interface RowData {
  [key: string]: { cell?: ReactNode | string | number | boolean };
}

interface TableProps {
  headers: col[];
  rows: RowData[];
  showHeader?: boolean;
}

export default function Table({
  headers,
  rows,
  showHeader = true,
}: TableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="mx-auto text-sm text-left rtl:text-right text-base-card-content">
        {showHeader && (
          <thead className="text-xs text-base-card-content ">
            <tr>
              {headers.map((header) => (
                <th key={header.col} scope="col" className="px-6 py-3">
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, rowIndex) => {
            const isHighlighted = row.highlighted.cell as boolean;
            return (
              <tr
                key={rowIndex}
                className={`bg-base-card cursor-pointer transition-all duration-300 ease-in-out mb-1 ${
                  isHighlighted
                    ? "bg-prime-content text-base-card hover:scale-110"
                    : "hover:bg-disable/20 text-base-card-content"
                }`}
              >
                {headers.map((header) => (
                  <td
                    key={header.col}
                    className="px-6 py-4 font-medium text-inherit whitespace-nowrap "
                  >
                    {row[header.col].cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
