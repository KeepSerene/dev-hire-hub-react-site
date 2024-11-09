// React imports
import { useEffect, useState } from "react";

// Service imports
import {
  createJob,
  deleteJob,
  initializeJobs,
  updateJob,
} from "./services/localStorage";

// Library imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout imports
import MainLayout from "./layouts/MainLayout";

// Page imports
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";

// Component imports
import Spinner from "./components/Spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize localStorage when app mounts
  useEffect(() => {
    const loadJobs = async () => {
      try {
        await initializeJobs();
      } catch (error) {
        console.error("Error loading jobs:", error);
        toast.error(`Error loading jobs: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  /* Commenting out json-server functions for future reference

  // Create operation
  const createJob = async (newJob) => {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    return;
  };

  // Delete operation
  const deleteJob = async (jobId) => {
    const response = await fetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
    });

    return;
  };

  // Update operation
  const updateJob = async (updatedJobInfo) => {
    const response = await fetch(`/api/jobs/${updatedJobInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJobInfo),
    });

    return;
  };
  */

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },

        {
          path: "/jobs",
          element: <JobsPage />,
        },

        {
          path: "/job/:jobId",
          element: <JobPage deleteJob={deleteJob} />,
          loader: jobLoader,
        },

        {
          path: "/add-job",
          element: <AddJobPage addJob={createJob} />,
        },

        {
          path: "/edit-job/:jobId",
          element: <EditJobPage editJob={updateJob} />,
          loader: jobLoader,
        },

        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
