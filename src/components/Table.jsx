
import React from 'react';

const Table = ({ data, columns, renderRow }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id || row.name}>
              {renderRow
                ? renderRow(row)
                : columns.map((col) => (
                    <td key={col} className="px-6 py-4">{row[col]}</td>
                  ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
