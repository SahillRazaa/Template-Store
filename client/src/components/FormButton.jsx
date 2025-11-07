import React from 'react';

const FormButton = ({ children, loading = false, ...props }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
};

export default FormButton;