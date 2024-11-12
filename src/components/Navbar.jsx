import React from "react";

function Navbar({ setSelectedTab }) {
  return (
    <nav className="bg-red-600 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://sitios.uao.edu.co/virtual/wp-content/uploads/sites/50/2020/03/uao-03-768x391.png" 
              alt="Logo" 
              className="h-8" 
            />
          </div>

          {/* Menu items */}
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => setSelectedTab("problem")}
              className="text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium transition duration-200 border-none"
            >
              Planteamiento del Problema
            </button>
            <button
              onClick={() => setSelectedTab("report")}
              className="text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium font transition duration-200 border-none"
            >
              Informe
            </button>
            <button
              onClick={() => setSelectedTab("graph")}
              className="text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium transition duration-200 border-none"
            >
              Gráfica en Tiempo Real
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white bg-red-600 hover:text-gray-300 focus:outline-none focus:text-gray-300 border-none"
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                menu.classList.toggle("hidden");
              }}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={() => setSelectedTab("problem")}
            className="text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium border-none"
          >
            Planteamiento del Problema
          </button>
          <button
            onClick={() => setSelectedTab("report")}
            className="text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium border-none"
          >
            Informe
          </button>
          <button
            onClick={() => setSelectedTab("graph")}
            className="text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium border-none"
          >
            Gráfica en Tiempo Real
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
