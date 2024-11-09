// Data import
import jobsData from "../../data/jobs.json";

// Library imports
import { toast } from "react-toastify";

const JOBS_KEY = "jobs";

// Array to hold all subscriber callbacks
let subscribers = [];

// Function to add new subscribers (see JobList.jsx)
export function subscribeToJobs(callback) {
  subscribers.push(callback);

  // Return function to remove this specific callback
  return () => {
    subscribers = subscribers.filter(
      (subscriberCallback) => subscriberCallback !== callback
    );
  };
}

// Function to notify all subscribers
function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

// Initialize localStorage with default data if empty
export async function initializeJobs() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const storedJobs = localStorage.getItem(JOBS_KEY);

    if (!storedJobs) {
      // If no jobs in localStorage, use default data
      localStorage.setItem(JOBS_KEY, JSON.stringify(jobsData.jobs));

      return jobsData.jobs;
    }

    return JSON.parse(storedJobs);
  } catch (error) {
    console.error("Error initializing jobs:", error);
    toast.error(`Error initializing jobs: ${error.message}`);

    return jobsData.jobs; // Fallback to default data
  }
}

// Create job
export async function createJob(newJob) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    const currentJobs = JSON.parse(localStorage.getItem(JOBS_KEY));

    const id = (
      Math.max(...currentJobs.map((job) => parseInt(job.id)), 0) + 1
    ).toString();

    const jobWithId = { ...newJob, id };

    const updatedJobs = [jobWithId, ...currentJobs];

    localStorage.setItem(JOBS_KEY, JSON.stringify(updatedJobs));

    // Notify subscribers of the change: call fetchJobs() (see JobList.jsx)
    notifySubscribers();

    return jobWithId;
  } catch (error) {
    console.error("Error creating job:", error);
    toast.error(`Failed to create job: ${error.message}`);
  }
}

// Read all jobs
export async function getAllJobs(limit = null) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

    const jobs = JSON.parse(localStorage.getItem(JOBS_KEY));

    return limit ? jobs.slice(0, limit) : jobs;
  } catch (error) {
    console.error("Error getting jobs:", error);
    toast.error(`Failed to fetch jobs: ${error.message}`);
  }
}

// Read single job
export async function getJobById(jobId) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

    const jobs = JSON.parse(localStorage.getItem(JOBS_KEY));
    const job = jobs.find((job) => job.id === jobId);

    if (!job) {
      toast.error("Job not found!");
      throw new Error("Job not found!");
    }

    return job;
  } catch (error) {
    console.error("Error getting job:", error);
    toast.error(`Failed to fetch job: ${error.message}`);
  }
}

// Update job
export async function updateJob(updatedJobInfo) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    const currentJobs = JSON.parse(localStorage.getItem(JOBS_KEY));
    const updatedJobs = currentJobs.map((job) =>
      job.id === updatedJobInfo.id ? updatedJobInfo : job
    );
    localStorage.setItem(JOBS_KEY, JSON.stringify(updatedJobs));

    // Notify subscribers of the change: call fetchJobs() (see JobList.jsx)
    notifySubscribers();

    return updatedJobInfo;
  } catch (error) {
    console.error("Error updating job:", error);
    toast.error(`Failed to update job: ${error.message}`);
  }
}

// Delete job
export async function deleteJob(jobId) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    const currentJobs = JSON.parse(localStorage.getItem(JOBS_KEY));
    const jobToDelete = currentJobs.find((job) => job.id === jobId);

    if (!jobToDelete) {
      toast.error("Job not found!");
      throw new Error("Job not found!");
    }

    const updatedJobs = currentJobs.filter((job) => job.id !== jobId);
    localStorage.setItem(JOBS_KEY, JSON.stringify(updatedJobs));

    // Notify subscribers of the change: call fetchJobs() (see JobList.jsx)
    notifySubscribers();

    return jobToDelete; // Optional (return what is needed or return "null")
  } catch (error) {
    console.error("Error deleting job:", error);
    toast.error(`Failed to delete job: ${error.message}`);
  }
}
