import React from 'react';
import Layout from '../../components/Layout';
import Table from '../../components/Table';

const StudentList = () => {
  const students = [
    { id: 1, name: 'John Doe', course: 'B.Tech CS', status: 'Active' },
    { id: 2, name: 'Jane Smith', course: 'B.Tech IT', status: 'Active' },
  ];

  return (
    <Layout role="mentor">
      <h2 className="text-3xl font-bold mb-6">Student List</h2>
      <Table data={students} columns={['name', 'course', 'status']} />
    </Layout>
  );
};

export default StudentList;
