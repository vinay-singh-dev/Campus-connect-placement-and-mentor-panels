import React from 'react';
import Layout from '../../components/Layout';

const Reports = () => {
  return (
    <Layout role="admin">
      <h2 className="text-3xl font-bold mb-6">Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-xl font-bold mb-2">Placement Status</h3>
          <p className="text-gray-500">Chart or summary here</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-xl font-bold mb-2">Application Stats</h3>
          <p className="text-gray-500">Chart or summary here</p>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
