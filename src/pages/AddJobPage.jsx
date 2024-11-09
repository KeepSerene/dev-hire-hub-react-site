// React imports
import { useState } from "react";

// Libray imports
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddJobPage({ addJob }) {
  const initialFormState = {
    type: "Full-Time",
    title: "",
    description: "",
    salary: "Under $50K",
    location: "",
    company: "",
    company_description: "",
    contact_email: "",
    contact_phone: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Computed property string; eg. "title": "Software Engineer"
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = {
      title: "Job Title",
      description: "Description",
      location: "Location",
      company: "Company Name",
      company_description: "Company Description",
      contact_email: "Contact Email",
      contact_phone: "Contact Phone",
    };

    // Check for empty required fields
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(`${label} is required!`);

        // Stop form submission if any field is empty
        return;
      }
    }

    const newJob = {
      title: formData.title.trim(),
      type: formData.type,
      location: formData.location.trim(),
      description: formData.description.trim(),
      salary: formData.salary,
      company: {
        name: formData.company.trim(),
        description: formData.company_description.trim(),
        contactEmail: formData.contact_email.trim(),
        contactPhone: formData.contact_phone.trim(),
      },
    };

    await addJob(newJob);

    toast.success(
      `${newJob.title.toUpperCase()} job has successfully been added!`
    );

    setFormData(initialFormState);

    return navigate("/jobs");
  };

  return (
    <div className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <section className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add New Job
            </h2>

            {/* Job type */}
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>

              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 outline-none focus:border-2 focus:border-indigo-500"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Job title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="eg. Senior Front-End Developer"
                required
                className="border rounded w-full py-2 px-3 mb-2 outline-none focus:border-2 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc."
                required
                className="border rounded w-full py-2 px-3 resize-y outline-none focus:border-2 focus:border-indigo-500"
              />
            </div>

            {/* Salary  */}
            <div className="mb-4">
              <label
                htmlFor="salary"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>

              <select
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 outline-none focus:border-2 focus:border-indigo-500"
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Location
              </label>

              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Company Location"
                required
                className="border rounded w-full py-2 px-3 mb-2 outline-none focus:border-2 focus:border-indigo-500"
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            {/* Company name */}
            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>

              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                required
                className="border rounded w-full py-2 px-3 outline-none focus:border-2 focus:border-indigo-500"
              />
            </div>

            {/* Company description */}
            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>

              <textarea
                id="company_description"
                name="company_description"
                value={formData.company_description}
                onChange={handleChange}
                rows="4"
                placeholder="What does your company do?"
                required
                className="border rounded w-full py-2 px-3 resize-y outline-none focus:border-2 focus:border-indigo-500"
              />
            </div>

            {/* Contact email */}
            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>

              <input
                type="email"
                id="contact_email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="Email address for applicants"
                required
                className="border rounded w-full py-2 px-3 outline-none focus:border-2 focus:border-indigo-500"
              />
            </div>

            {/* Contact phone number */}
            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>

              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                placeholder="Optional phone number for applicants"
                required
                className="border rounded w-full py-2 px-3 outline-none focus:border-2 focus:border-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-indigo-500 transition-colors ease-in-out duration-300 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              >
                Add Job
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddJobPage;
