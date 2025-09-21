// src/api/adminApi.js
import axios from 'axios';

// Mock data (for testing UI without backend)
let mockApplications = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending' },
];

// Fetch all applications
export const getApplications = async () => {
  // Replace this with real API call later
  // return axios.get('/api/admin/applications');
  return mockApplications;
};

// Approve an application
export const approveApplication = async (id) => {
  // Replace this with real API call later
  // return axios.post(`/api/admin/applications/${id}/approve`);
  
  // Mock update
  mockApplications = mockApplications.map(app =>
    app.id === id ? { ...app, status: 'approved' } : app
  );
  return { success: true };
};

// Reject an application
export const rejectApplication = async (id) => {
  // Replace this with real API call later
  // return axios.post(`/api/admin/applications/${id}/reject`);
  
  // Mock update
  mockApplications = mockApplications.map(app =>
    app.id === id ? { ...app, status: 'rejected' } : app
  );
  return { success: true };
};
