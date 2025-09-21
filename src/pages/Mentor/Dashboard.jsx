import React from 'react';
import Layout from '../../components/Layout';
import DashboardCard from '../../components/DashboardCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Table from '../../components/Table';

const barData = [
  { month: 'Jan', approved: 10, rejected: 2 },
  { month: 'Feb', approved: 15, rejected: 3 },
  { month: 'Mar', approved: 8, rejected: 1 },
];

const studentData = [
  { name: 'John Doe', branch: 'CSE', status: 'Approved' },
  { name: 'Jane Smith', branch: 'ECE', status: 'Pending' },
  { name: 'Alice Johnson', branch: 'ME', status: 'Rejected' },
];

const MentorDashboard = () => {
  return (
    <Layout role="mentor">
      <h2 className="text-2xl font-bold mb-6">Mentor Dashboard</h2>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Students" value="40" color="bg-white" />
        <DashboardCard title="Approvals" value="25" color="bg-white" />
        <DashboardCard title="Pending" value="12" color="bg-white" />
        <DashboardCard title="Feedbacks" value="8" color="bg-white" />
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Approval Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="approved" fill="#4ADE80" />
              <Bar dataKey="rejected" fill="#F87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-semibold mb-4">Recent Students</h3>
          <Table data={studentData} columns={['name', 'branch', 'status']} />
        </div>
      </div>
    </Layout>
  );
};

export default MentorDashboard;
