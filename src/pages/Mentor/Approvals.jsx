import React from 'react';
import Layout from '../../components/Layout';
import Table from '../../components/Table';

const Approvals = () => {
  const approvals = [
    { id: 1, student: 'John Doe', opportunity: 'Software Engineer', status: 'Pending' },
    { id: 2, student: 'Jane Smith', opportunity: 'Developer', status: 'Approved' },
  ];

  return (
    <Layout role="mentor">
      <h2 className="text-3xl font-bold mb-6">Approvals</h2>
      <Table data={approvals} columns={['student', 'opportunity', 'status']} />
    </Layout>
  );
};

export default Approvals;
