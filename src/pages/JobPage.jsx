// Library imports
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

// Service imports
import { getJobById } from "../services/localStorage";

function JobPage({ deleteJob }) {
  const job = useLoaderData();

  const navigate = useNavigate();

  const handleDelete = (jobId) => {
    const isConfirmed = confirm(
      `Are you sure you want to delete ${job.title.toUpperCase()} job?`
    );

    if (!isConfirmed) return;

    deleteJob(jobId);
    toast.success(
      `${job.title.toUpperCase()} job has successfully been deleted!`
    );

    return navigate("/jobs");
  };

  return (
    <>
      {/* Go back button */}
      <div className="container m-auto py-6 px-6">
        <Link
          to="/jobs"
          className="text-indigo-500 transition-colors ease-in-out duration-300 hover:text-indigo-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </Link>
      </div>

      <div className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-60/40 w-full gap-6">
            <main>
              <section className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <p className="text-gray-500 mb-4">{job.type}</p>

                <h1 className="text-3xl font-bold capitalize mb-4">
                  {job.title}
                </h1>

                <div className="text-gray-500 mb-4 flex items-center justify-center md:justify-start">
                  <FaLocationDot className="text-orange-700 text-lg mr-2" />

                  <p className="text-orange-700 capitalize">{job.location}</p>
                </div>
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold capitalize mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold capitalize mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </section>
            </main>

            {/* Right sidebar */}
            <aside>
              {/*  Company Info  */}
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl capitalize">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl capitalize">Contact Email:</h3>

                <p className=" bg-indigo-100 font-bold break-words p-2 my-2">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl capitalize">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </section>

              {/*  Manage job */}
              <section className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold capitalize mb-6">
                  Manage Job
                </h3>

                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 transition-colors ease-in-out duration-300 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 transition-colors ease-in-out duration-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// Data loader function | "params" is the same URL paramater that we recieve from useParams()
async function jobLoader({ params }) {
  return await getJobById(params.jobId);

  /* Commenting out json-server loader for future reference
  // Read operation
  const response = await fetch(`/api/jobs/${params.jobId}`);
  const data = await response.json();

  return data;
  */
}

export { JobPage as default, jobLoader };
