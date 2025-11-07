import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-3 text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <FormInput
              id="email"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <FormButton loading={loading}>
              Sign In
            </FormButton>
          </form>
        </div>

        <p className="text-center text-gray-600 mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-gray-900 hover:text-gray-700 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}