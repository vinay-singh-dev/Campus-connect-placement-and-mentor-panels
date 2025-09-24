import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { DarkModeContext } from "../../context/DarkModeContext";

const AdminOpportunities = () => {
  const { darkMode } = useContext(DarkModeContext);

  const [opportunities, setOpportunities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState(null); // For custom delete confirmation
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
    if (!dateStr) return "bg-gray-500";
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
      if (editingIndex !== null) {
        const jobToUpdate = opportunities[editingIndex];
        console.log(jobToUpdate);
        
        await axios.put( 
        
          `${import.meta.env.VITE_API_URL}/admin/edit-post`,
          { ...form, jobId: jobToUpdate.id || jobToUpdate.id || jobToUpdate.job_id },
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        
        const updated = [...opportunities];
        updated[editingIndex] = { ...form, status: "Live" };
        setOpportunities(updated);
        setEditingIndex(null);
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/job-post`,
          form,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
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
        compensationType: "salary",
        compensationAmount: "",
      });
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save opportunity.");
    }
  };

  const getoppo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-jobs`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      setOpportunities(response.data);
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
    setDeleteConfirmIndex(index); // Open custom confirmation modal
  };

  const confirmDelete = async () => {
    const index = deleteConfirmIndex;
    if (index === null) return;

    const job = opportunities[index];
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/delete-post/${job.id}`,
        {
          headers: { "ngrok-skip-browser-warning": "true" },
          params: { job_id: job._id || job.id || job.job_id },
        }
      );
      const updated = opportunities.filter((_, i) => i !== index);
      setOpportunities(updated);
      setDeleteConfirmIndex(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete opportunity.");
    }
  };

  useEffect(() => {
    getoppo();
  }, []);

  return (
    <Layout role="admin">
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-3xl font-space font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode ? "from-[#0ea5e9] to-[#f59e0b]" : "from-[#164e63] to-[#d97706]"
          }`}
        >
          Manage Opportunities
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Create Opportunity
        </button>
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className={`rounded-xl shadow-xl w-full max-w-2xl p-6 relative ${
              darkMode ? "bg-[#1e293b] border border-[#334155]" : "bg-white border border-[#e2e8f0]"
            }`}
          >
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
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
            >
              <X size={22} />
            </button>

            <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
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
                  className={`border p-2 rounded ${
                    darkMode
                      ? "bg-[#0f172a] text-gray-200 border border-[#334155]"
                      : "bg-gray-100 text-gray-900 border border-[#e2e8f0]"
                  } focus:ring-2 ${darkMode ? "focus:ring-[#0ea5e9]" : "focus:ring-[#164e63]"}`}
                />
              ))}

              <select
                name="compensationType"
                value={form.compensationType}
                onChange={handleChange}
                className={`border p-2 rounded ${
                  darkMode
                    ? "bg-[#0f172a] text-gray-200 border border-[#334155]"
                    : "bg-gray-100 text-gray-900 border border-[#e2e8f0]"
                } focus:ring-2 ${darkMode ? "focus:ring-[#0ea5e9]" : "focus:ring-[#164e63]"}`}
              >
                <option value="salary">Salary</option>
                <option value="Stipend">Stipend</option>
              </select>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Job Description"
                className={`border p-2 rounded col-span-2 ${
                  darkMode
                    ? "bg-[#0f172a] text-gray-200 border border-[#334155]"
                    : "bg-gray-100 text-gray-900 border border-[#e2e8f0]"
                } focus:ring-2 ${darkMode ? "focus:ring-[#0ea5e9]" : "focus:ring-[#164e63]"}`}
              />
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="Requirements"
                className={`border p-2 rounded col-span-2 ${
                  darkMode
                    ? "bg-[#0f172a] text-gray-200 border border-[#334155]"
                    : "bg-gray-100 text-gray-900 border border-[#e2e8f0]"
                } focus:ring-2 ${darkMode ? "focus:ring-[#0ea5e9]" : "focus:ring-[#164e63]"}`}
              />
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Additional Details"
                className={`border p-2 rounded col-span-2 ${
                  darkMode
                    ? "bg-[#0f172a] text-gray-200 border border-[#334155]"
                    : "bg-gray-100 text-gray-900 border border-[#e2e8f0]"
                } focus:ring-2 ${darkMode ? "focus:ring-[#0ea5e9]" : "focus:ring-[#164e63]"}`}
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

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {opportunities.length === 0 ? (
          <p className="text-gray-400">No opportunities posted yet.</p>
        ) : (
          opportunities.map((job, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCard(idx)}
              className={`relative p-8 rounded-xl cursor-pointer overflow-hidden transition-transform hover:scale-105 hover:shadow-xl duration-300 ${
                darkMode ? "bg-[#1e293b] border border-[#334155]" : "bg-[#ecfeff] border border-[#e2e8f0]"
              }`}
              style={{ minHeight: "220px" }}
            >
              <div
                className={`absolute inset-0 pointer-events-none rounded-xl opacity-70 ${
                  darkMode
                    ? "bg-gradient-to-tr from-[#0ea5e9]/10 via-transparent to-[#f59e0b]/10"
                    : "bg-gradient-to-tr from-[#164e63]/10 via-transparent to-[#d97706]/10"
                }`}
              ></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      job.status === "Live"
                        ? "bg-[#4ADE80] text-white"
                        : job.status === "Expired"
                        ? "bg-[#F87171] text-white"
                        : "bg-[#FACC15] text-black"
                    }`}
                  >
                    {job.status}
                  </span>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {job.duration}
                  </span>
                </div>

                <h3 className={`text-xl font-bold font-space ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {job.title}
                </h3>
                <p className={`text-base mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{job.job_role}</p>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-700"}`}>{job.location}</p>

                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  <span className="px-2 py-1 rounded-full bg-white text-blue-700 font-semibold">
                    {!job.salary?"stipend":"salary"}: ₹{!job.salary?job.stipend:job.salary}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white text-blue-700 font-semibold">
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
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className={`rounded-xl shadow-xl w-full max-w-sm p-6 relative flex flex-col items-center gap-4 ${
              darkMode ? "bg-[#1e293b] border border-[#334155]" : "bg-white border border-[#e2e8f0]"
            }`}
          >
            <p className={`${darkMode ? "text-white" : "text-gray-900"} text-center`}>
              Are you sure you want to delete this opportunity?
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-100 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteConfirmIndex(null)}
                className="flex-1 py-2 rounded-lg border border-green-500 text-green-500 hover:bg-green-100 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Card Modal */}
      {selectedCard !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className={`rounded-xl shadow-xl w-full max-w-2xl p-6 relative ${
              darkMode ? "bg-[#1e293b] border border-[#334155]" : "bg-white border border-[#e2e8f0]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
            >
              <X size={22} />
            </button>

            {selectedCard !== null && (() => {
              const job = opportunities[selectedCard];
              return (
                <div className="space-y-4">
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        job.status === "Live"
                          ? "bg-[#4ADE80] text-white"
                          : job.status === "Expired"
                          ? "bg-[#F87171] text-white"
                          : "bg-[#FACC15] text-black"
                      }`}
                    >
                      {job.status}
                    </span>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {job.duration}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold font-space ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {job.title}
                  </h3>
                  <p className={`text-base mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{job.job_role}</p>
                  <p className={`text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-700"}`}>{job.location}</p>

                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    <span className="px-2 py-1 rounded-full bg-white text-blue-700 font-semibold">
                      {job.compensationType}: ₹{job.compensationAmount}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white text-blue-700 font-semibold">
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

                  <div className={`mt-4 space-y-2 ${darkMode ? "text-gray-200" : "text-gray-800"} text-sm`}>
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
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminOpportunities;
