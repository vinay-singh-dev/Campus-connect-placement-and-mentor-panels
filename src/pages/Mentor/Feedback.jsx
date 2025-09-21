import React from 'react';
import Layout from '../../components/Layout';

const Feedback = () => {
  const feedbacks = [
    { student: 'John Doe', message: 'Need guidance on resume.' },
    { student: 'Jane Smith', message: 'Looking for coding tips.' },
  ];

  return (
    <Layout role="mentor">
      <h2 className="text-3xl font-bold mb-6">Feedback</h2>
      <div className="bg-white shadow rounded p-6">
        {feedbacks.map((fb, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <p className="font-semibold">{fb.student}</p>
            <p className="text-gray-600">{fb.message}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Feedback;
