import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          theme="dark"
        />
      </div>
    </AuthProvider>
  );
}