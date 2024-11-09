// React import
import { useEffect, useState } from "react";

// Service imports
import { getAllJobs, subscribeToJobs } from "../services/localStorage";

// Component imports
import Job from "./Job";
import Spinner from "./Spinner";

// Library imports
import { toast } from "react-toastify";

function JobList({ isHomePage = false }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs(isHomePage ? 3 : null);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs", error);
        toast.error(`Error fetching jobs: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchJobs();

    // Subscribe to job changes, i.e., subscribe when component mounts
    const unsubscribe = subscribeToJobs(() => fetchJobs());
    // subscribers array now: [fetchJobs] (see localStorage.js)

    // Cleanup subscription on unmount, i.e., unsubscribe when component unmounts
    return () => unsubscribe();
    // subscribers array now: [] (see localStorage.js)

    /* Commenting out json-server fetch for future reference
    const fetchJobs = async () => {
      // To learn more about the path "/api", see the vite config file
      const apiURL = isHomePage ? "/api/jobs?_limit=3" : "/api/jobs";

      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
    */
  }, [isHomePage]);

  return (
    <article className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHomePage ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {isLoading ? (
          <Spinner isLoading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Job key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default JobList;
