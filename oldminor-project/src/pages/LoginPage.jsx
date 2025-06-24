import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Users } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ general: errorData.message || 'Login failed' });
        return;
      }

      const data = await response.json();

      // Save token and userId for authentication
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Network error: ' + error.message });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
    if (errors.general) {
      setErrors({
        ...errors,
        general: ''
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Graphic */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-100 via-teal-100 to-emerald-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-900/10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-amber-900">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-xl text-amber-800 max-w-md text-center">
              Continue your learning journey with focused study sessions and collaborative tools.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 text-center border border-white/40">
              <div className="text-2xl font-bold">1,200+</div>
              <div className="text-sm text-amber-800">Active Students</div>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 text-center border border-white/40">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-amber-800">Study Rooms</div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-amber-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-teal-400/20 rounded-full blur-xl"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-teal-700 bg-clip-text text-transparent">
                StudySpace
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600">Access your study dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {errors.general && <p className="text-red-600 mb-2">{errors.general}</p>}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-amber-600 hover:text-amber-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-amber-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-amber-600 hover:text-amber-500 font-semibold">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
