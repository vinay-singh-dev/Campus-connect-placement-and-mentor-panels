
import React from 'react';

const DashboardCard = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow ${color}`}>
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
