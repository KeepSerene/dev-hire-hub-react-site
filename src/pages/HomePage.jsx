// Component imports
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobList from "../components/JobList";
import ViewAllJobs from "../components/ViewAllJobs";

function HomePage() {
  return (
    <main>
      <Hero />
      <HomeCards />
      <JobList isHomePage={true} />
      <ViewAllJobs />
    </main>
  );
}

export default HomePage;
