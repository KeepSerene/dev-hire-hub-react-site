import logo from "/logo.png";

// Library imports
import { Link, NavLink } from "react-router-dom";

function Header() {
  // Recieves the parameter from "NavLink"
  const getNavLinkClassName = ({ isActive }) => {
    const defaultClassName =
      "text-white transition-colors ease-in-out duration-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
    const navLinkClassName = isActive
      ? `bg-black ${defaultClassName}`
      : defaultClassName;

    return navLinkClassName;
  };

  return (
    <header>
      <nav className="bg-indigo-700 border-b border-indigo-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <Link to="/" className="flex flex-shrink-0 items-center mr-4">
                <img src={logo} alt="Logo" className="h-10 w-auto" />

                <span className="hidden md:block text-white text-2xl font-bold capitalize ml-2">
                  DevHire Hub
                </span>
              </Link>

              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink to="/" className={getNavLinkClassName}>
                    Home
                  </NavLink>

                  <NavLink to="/jobs" className={getNavLinkClassName}>
                    Jobs
                  </NavLink>

                  <NavLink to="/add-job" className={getNavLinkClassName}>
                    Add Job
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
