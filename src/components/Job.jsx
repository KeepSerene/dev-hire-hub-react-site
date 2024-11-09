// React imports
import { useState } from "react";

// Library imports
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

function Job({ job }) {
  const [shouldShowFullDesc, setShouldShowFullDesc] = useState(false);

  let description = job.description;

  if (!shouldShowFullDesc && description.length > 89) {
    description = `${description.substring(0, 90)}...`;
  }

  return (
    <section className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <p className="text-gray-600 my-2">{job.type}</p>

          <h3 className="text-xl font-bold capitalize">{job.title}</h3>
        </div>

        <p className="mb-5">{description}</p>

        {description.length > 89 && (
          <button
            type="button"
            onClick={() => setShouldShowFullDesc((prevState) => !prevState)}
            className="text-indigo-500 font-bold mb-5 transition-colors ease-in-out duration-300 hover:text-indigo-600"
          >
            {shouldShowFullDesc ? "Show less" : "Show more"}
          </button>
        )}

        <h3 className="text-indigo-500 capitalize mb-2">{job.salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 capitalize mb-3">
            <FaMapMarker className="inline text-lg mr-1 mb-1" />

            {job.location}
          </div>

          <Link
            to={`/job/${job.id}`}
            className="h-[36px] bg-indigo-500 transition-colors ease-in-out duration-300 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Job;
