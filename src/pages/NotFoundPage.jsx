// Libray import
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    // Header height = 80.8px
    <main className="min-h-[calc(100vh-80.8px)] flex justify-center items-center">
      <section className="text-center">
        <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto mb-4" />

        <h1 className="text-6xl font-bold mb-4">404</h1>

        <h2 className="text-5xl font-bold capitalize mb-4">Page not found</h2>

        <p className="text-xl mb-5">This page does not exist</p>

        <Link
          to="/"
          className="text-white bg-indigo-700 rounded-md px-3 py-2 mt-4 transition-colors ease-in-out duration-300 hover:bg-indigo-900"
        >
          Go Back
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
