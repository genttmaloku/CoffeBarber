import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
           className={`w-full flex items-start ps-3 pe-4 py-2 ${
  active
    ? 'bg-red-900 text-red-200 focus:text-red-800 focus:bg-red-100 opacity-60'
    : 'text-white hover:text-white hover:bg-gray-50 focus:text-gray-800 focus:bg-gray-50 opacity-80'
} text-base font-medium focus:outline-none transition duration-150 ease-in-out custom-navlink ${className}`}

        >
            {children}
        </Link>
    );
}
