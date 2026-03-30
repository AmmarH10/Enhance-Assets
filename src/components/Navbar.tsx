import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Menu, X } from 'lucide-react';
import { DIVISIONS } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AssetPro</span>
            </NavLink>
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  )
                }
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </NavLink>
              {DIVISIONS.map((division) => (
                <NavLink
                  key={division}
                  to={`/division/${encodeURIComponent(division)}`}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    )
                  }
                >
                  {division}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )
              }
            >
              Dashboard
            </NavLink>
            {DIVISIONS.map((division) => (
              <NavLink
                key={division}
                to={`/division/${encodeURIComponent(division)}`}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  )
                }
              >
                {division}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
