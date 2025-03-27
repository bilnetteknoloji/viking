import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
  fullName: string;
  nationality: string;
  identityNumber: string;
  phone: string;
  peopleCount: number;
  accommodationAddress: string;
  tourDate: string;
  tourId: string;
}

interface FormErrors {
  fullName?: string;
  nationality?: string;
  identityNumber?: string;
  phone?: string;
  peopleCount?: string;
  accommodationAddress?: string;
  tourDate?: string;
  tourId?: string;
}

const ReservationCreate: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock data for tours
  const availableTours = [
    { id: '1', name: 'Paradise Bay Tour', price: 50 },
    { id: '2', name: 'Blue Lagoon Adventure', price: 65 },
    { id: '3', name: 'Sunset Cruise', price: 45 },
  ];

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    nationality: '',
    identityNumber: '',
    phone: '',
    peopleCount: 1,
    accommodationAddress: '',
    tourDate: '',
    tourId: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('reservation.fullNameRequired', 'Full name is required');
    }
    
    if (!formData.nationality.trim()) {
      newErrors.nationality = t('reservation.nationalityRequired', 'Nationality is required');
    }
    
    if (!formData.identityNumber.trim()) {
      newErrors.identityNumber = t('reservation.identityNumberRequired', 'Identity/Passport number is required');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('reservation.phoneRequired', 'Phone number is required');
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = t('reservation.invalidPhone', 'Please enter a valid phone number');
    }
    
    if (formData.peopleCount < 1) {
      newErrors.peopleCount = t('reservation.invalidPeopleCount', 'At least 1 person is required');
    }
    
    if (!formData.accommodationAddress.trim()) {
      newErrors.accommodationAddress = t('reservation.accommodationAddressRequired', 'Accommodation address is required');
    }
    
    if (!formData.tourDate) {
      newErrors.tourDate = t('reservation.tourDateRequired', 'Tour date is required');
    } else {
      const selectedDate = new Date(formData.tourDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.tourDate = t('reservation.pastDateError', 'Tour date cannot be in the past');
      }
    }
    
    if (!formData.tourId) {
      newErrors.tourId = t('reservation.tourRequired', 'Please select a tour');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'peopleCount' ? Number(value) : value,
    });
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would send the data to the backend API
      console.log('Reservation Data:', formData);
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          nationality: '',
          identityNumber: '',
          phone: '',
          peopleCount: 1,
          accommodationAddress: '',
          tourDate: '',
          tourId: '',
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating reservation:', error);
      setSubmitError(t('reservation.errorMessage', 'An error occurred while creating the reservation.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 text-center">
          <h3 className="text-lg font-medium mb-2">
            {t('reservation.successTitle', 'Reservation Created!')}
          </h3>
          <p className="mb-4">
            {t('reservation.successMessage', 'Your reservation has been created successfully. We will contact you shortly with additional information.')}
          </p>
          <p className="text-sm mb-2">
            {t('reservation.successInfo', 'A confirmation has been sent to your phone number.')}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setIsSuccess(false)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {t('reservation.newReservation', 'Create Another Reservation')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">{t('reservation.create', 'Create Reservation')}</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {submitError}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.fullName', 'Full Name')} *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full form-input rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>
          
          {/* Nationality */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.nationality', 'Nationality')} *
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className={`w-full form-input rounded-md ${errors.nationality ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.nationality && (
              <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
            )}
          </div>
          
          {/* Identity Number / Passport */}
          <div>
            <label htmlFor="identityNumber" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.identityNumber', 'Identity Number / Passport Number')} *
            </label>
            <input
              type="text"
              id="identityNumber"
              name="identityNumber"
              value={formData.identityNumber}
              onChange={handleChange}
              className={`w-full form-input rounded-md ${errors.identityNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.identityNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.identityNumber}</p>
            )}
          </div>
          
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.phone', 'Phone Number')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+90 5XX XXX XX XX"
              className={`w-full form-input rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          
          {/* People Count */}
          <div>
            <label htmlFor="peopleCount" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.peopleCount', 'Number of People')} *
            </label>
            <input
              type="number"
              id="peopleCount"
              name="peopleCount"
              min="1"
              value={formData.peopleCount}
              onChange={handleChange}
              className={`w-full form-input rounded-md ${errors.peopleCount ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.peopleCount && (
              <p className="mt-1 text-sm text-red-600">{errors.peopleCount}</p>
            )}
          </div>
          
          {/* Tour Selection */}
          <div>
            <label htmlFor="tourId" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.tourSelection', 'Select Tour')} *
            </label>
            <select
              id="tourId"
              name="tourId"
              value={formData.tourId}
              onChange={handleChange}
              className={`w-full form-select rounded-md ${errors.tourId ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">{t('reservation.selectTour', 'Select a tour')}</option>
              {availableTours.map(tour => (
                <option key={tour.id} value={tour.id}>
                  {tour.name} - ${tour.price}
                </option>
              ))}
            </select>
            {errors.tourId && (
              <p className="mt-1 text-sm text-red-600">{errors.tourId}</p>
            )}
          </div>
          
          {/* Tour Date */}
          <div>
            <label htmlFor="tourDate" className="block text-sm font-medium text-gray-700 mb-1">
              {t('reservation.tourDate', 'Tour Date')} *
            </label>
            <input
              type="date"
              id="tourDate"
              name="tourDate"
              value={formData.tourDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full form-input rounded-md ${errors.tourDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.tourDate && (
              <p className="mt-1 text-sm text-red-600">{errors.tourDate}</p>
            )}
          </div>
        </div>
        
        {/* Accommodation Address */}
        <div className="mt-6">
          <label htmlFor="accommodationAddress" className="block text-sm font-medium text-gray-700 mb-1">
            {t('reservation.accommodationAddress', 'Accommodation Address')} *
          </label>
          <textarea
            id="accommodationAddress"
            name="accommodationAddress"
            rows={3}
            value={formData.accommodationAddress}
            onChange={handleChange}
            className={`w-full form-textarea rounded-md ${errors.accommodationAddress ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.accommodationAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.accommodationAddress}</p>
          )}
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-brand-600 text-white font-medium rounded-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('common.loading', 'Loading...')}
              </span>
            ) : (
              t('common.submit', 'Submit')
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-4 text-center">
          {t('reservation.privacyNote', 'Your personal information is securely encrypted and will only be used for booking purposes.')}
        </p>
      </form>
    </div>
  );
};

export default ReservationCreate; 