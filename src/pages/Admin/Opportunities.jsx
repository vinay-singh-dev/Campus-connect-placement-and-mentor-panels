import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Plus, X } from "lucide-react";
import axios from "axios";

const AdminOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); 
  const [form, setForm] = useState({
    job_type: "",
    title: "",
    job_role: "",
    description: "",
    requirements: "",
    location: "",
    details: "",
    deadline: "",
    duration: "",
    compensationType: "salary",
    compensationAmount: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysLeft = (dateStr) => {
    if (!dateStr) return "No deadline";
    const deadline = new Date(dateStr);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days left` : "Expired";
  };

  const getDeadlineBadgeColor = (dateStr) => {
    const deadline = new Date(dateStr);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "bg-red-600";
    if (diffDays <= 5) return "bg-yellow-500";
    return "bg-gray-500";
  };

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (
      !form.job_type ||
      !form.title ||
      !form.job_role ||
      !form.description ||
      !form.requirements ||
      !form.location ||
      !form.details ||
      !form.deadline ||
      !form.duration ||
      !form.compensationAmount
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://fb2e398f1311.ngrok-free.app/api/admin/job-post",
        form,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      console.log(response);

      if (editingIndex !== null) {
        const updated = [...opportunities];
        updated[editingIndex] = { ...form, status: "Live" };
        setOpportunities(updated);
        setEditingIndex(null);
      } else {
        setOpportunities([...opportunities, { ...form, status: "Live" }]);
      }

      setForm({
        job_type: "",
        title: "",
        job_role: "",
        description: "",
        requirements: "",
        location: "",
        details: "",
        deadline: "",
        duration: "",
        compensationType: "Salary",
        compensationAmount: "",
      });

      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getoppo = async () => {
    try {
      const response = await axios.get(
        "https://fb2e398f1311.ngrok-free.app/api/admin/get-jobs",
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      setOpportunities(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    setForm({ ...opportunities[index] });
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = opportunities.filter((_, i) => i !== index);
    setOpportunities(updated);
  };

  useEffect(() => {
    getoppo();
  }, []);

  return (
    <Layout role="admin">
      {}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Manage Opportunities
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Create Opportunity
        </button>
      </div>

      {}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card w-full max-w-2xl p-6 relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setEditingIndex(null);
                setForm({
                  job_type: "",
                  title: "",
                  job_role: "",
                  description: "",
                  requirements: "",
                  location: "",
                  details: "",
                  deadline: "",
                  duration: "",
                  compensationType: "salary",
                  compensationAmount: "",
                });
              }}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {editingIndex !== null ? "Edit Opportunity" : "Create Opportunity"}
            </h3>

            <form
              onSubmit={handleAddOrUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto"
            >
              {[
                "job_type",
                "title",
                "job_role",
                "location",
                "duration",
                "deadline",
                "compensationAmount",
              ].map((field) => (
                <input
                  key={field}
                  type={field === "deadline" ? "date" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  className="border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
              ))}

              <select
                name="compensationType"
                value={form.compensationType}
                onChange={handleChange}
                className="border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              >
                <option value="salary">Salary</option>
                <option value="Stipend">Stipend</option>
              </select>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Job Description"
                className="border p-2 rounded col-span-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="Requirements"
                className="border p-2 rounded col-span-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Additional Details"
                className="border p-2 rounded col-span-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 hover:bg-blue-700 transition"
              >
                {editingIndex !== null ? "Update Opportunity" : "Add Opportunity"}
              </button>
            </form>
          </div>
        </div>
      )}

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No opportunities posted yet.</p>
        ) : (
          opportunities.map((job, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCard(idx)}
              className="p-6 rounded-2xl shadow-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105 duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
                  Live
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{job.duration}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{job.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{job.job_role}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{job.location}</p>

              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                <span className="px-2 py-1 rounded-full bg-green-500 text-white font-semibold">
                  {!job.salary?"stipend":"salary"}: ₹{!job.salary?job.stipend:job.salary}
                </span>
                <span className="px-2 py-1 rounded-full bg-blue-500 text-white font-semibold">
                  Type: {job.job_type}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-white font-semibold ${getDeadlineBadgeColor(
                    job.deadline
                  )}`}
                >
                  {getDaysLeft(job.deadline)}
                </span>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(idx);
                  }}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(idx);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {}
      {selectedCard !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-card w-full max-w-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            {selectedCard !== null && (
              <>
                {(() => {
                  const job = opportunities[selectedCard];
                  return (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
                          Live
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{job.duration}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{job.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{job.job_role}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{job.location}</p>

                      <div className="flex flex-wrap gap-2 mt-2 text-sm">
                        <span className="px-2 py-1 rounded-full bg-green-500 text-white font-semibold">
                          {job.compensationType}: ₹{job.compensationAmount}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-blue-500 text-white font-semibold">
                          Type: {job.job_type}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-white font-semibold ${getDeadlineBadgeColor(
                            job.deadline
                          )}`}
                        >
                          {formatDate(job.deadline)}
                        </span>
                      </div>

                      <div className="mt-4 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                        <p>
                          <strong>Description:</strong> {job.description}
                        </p>
                        <p>
                          <strong>Requirements:</strong> {job.requirements}
                        </p>
                        <p>
                          <strong>Additional Details:</strong> {job.details}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminOpportunities;
