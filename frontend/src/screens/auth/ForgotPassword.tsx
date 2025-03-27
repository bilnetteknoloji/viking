import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError(t('forgotPassword.emailRequired', 'Email is required'));
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('forgotPassword.invalidEmail', 'Invalid email address'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API request to send a reset email
      setIsSubmitted(true);
    } catch (err) {
      setError(t('common.error', 'An error occurred. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('forgotPassword.title', 'Reset your password')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('forgotPassword.description', 'Enter your email address and we\'ll send you a link to reset your password.')}
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4">
            <h3 className="text-lg font-medium mb-2">{t('forgotPassword.emailSent', 'Check your email')}</h3>
            <p className="text-sm mb-4">
              {t('forgotPassword.emailSentDescription', 'We have sent a password reset link to')} <span className="font-medium">{email}</span>
            </p>
            <p className="text-sm mb-4">
              {t('forgotPassword.checkSpam', 'If you don\'t see it, please check your spam folder.')}
            </p>
            <div className="flex justify-center mt-4">
              <Link
                to="/login"
                className="btn btn-primary"
              >
                {t('forgotPassword.backToLogin', 'Back to login')}
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                {t('forgotPassword.email', 'Email address')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
                placeholder={t('forgotPassword.email', 'Email address') as string}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
            
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
                  t('forgotPassword.sendResetLink', 'Send reset link')
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-center">
              <Link
                to="/login"
                className="text-sm font-medium text-brand-600 hover:text-brand-500"
              >
                {t('forgotPassword.rememberPassword', 'Remember your password?')} {t('forgotPassword.backToLogin', 'Back to login')}
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 