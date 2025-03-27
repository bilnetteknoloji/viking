import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: '',
    general: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = t('register.nameRequired', 'Name is required');
      valid = false;
    }
    
    if (!formData.email) {
      newErrors.email = t('register.emailRequired', 'Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('register.invalidEmail', 'Invalid email address');
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = t('register.passwordRequired', 'Password is required');
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = t('register.passwordLength', 'Password must be at least 8 characters');
      valid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.passwordsNotMatch', 'Passwords do not match');
      valid = false;
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t('register.agreeTermsRequired', 'You must agree to the terms');
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: '',
      general: '',
    });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the registration request to your API
      // For demo purposes, we'll just redirect to login
      navigate('/login');
    } catch (error) {
      setErrors({
        ...errors,
        general: t('common.error', 'An error occurred. Please try again.'),
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('register.title', 'Create a new account')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('register.alreadyAccount', 'Already have an account?')}{' '}
            <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500">
              {t('register.loginLink', 'Sign in here')}
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {errors.general}
            </div>
          )}
          
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.name', 'Full Name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                placeholder={t('register.name', 'Full Name') as string}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.email', 'Email address')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder={t('register.email', 'Email address') as string}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.password', 'Password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                placeholder={t('register.password', 'Password') as string}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.confirmPassword', 'Confirm Password')}
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder={t('register.confirmPassword', 'Confirm Password') as string}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agreeTerms"
              type="checkbox"
              className={`h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded ${errors.agreeTerms ? 'border-red-500' : ''}`}
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              {t('register.agreeTerms', 'I agree to the')} {' '}
              <Link to="/terms" className="text-brand-600 hover:text-brand-500">
                {t('register.termsLink', 'Terms & Conditions')}
              </Link>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
          )}

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.loading', 'Loading...')}
                </span>
              ) : (
                t('register.createAccount', 'Create Account')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 