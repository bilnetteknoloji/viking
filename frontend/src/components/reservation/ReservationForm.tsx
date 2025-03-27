import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

// Reservation type
interface ReservationFormData {
  name: string;
  nationality: string;
  identityNumber: string;
  phone: string;
  peopleCount: number;
  accommodationAddress: string;
  tourId: string;
  tourDate: string;
}

// Props for the form
interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => Promise<void>;
  tours: { id: string; name: string }[];
  isLoading?: boolean;
  userData?: {
    name?: string;
    phone?: string;
  };
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onSubmit,
  tours,
  isLoading = false,
  userData = {}
}) => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    defaultValues: {
      name: userData?.name || '',
      nationality: '',
      identityNumber: '',
      phone: userData?.phone || '',
      peopleCount: 2,
      accommodationAddress: '',
      tourId: tours[0]?.id || '',
      tourDate: new Date().toISOString().split('T')[0],
    },
  });

  const handleFormSubmit: SubmitHandler<ReservationFormData> = async (data) => {
    try {
      setSubmitting(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      
      await onSubmit(data);
      setSuccessMessage(t('reservation.successMessage') || 'Reservation created successfully!');
      reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : t('reservation.errorMessage') || 'An error occurred while creating the reservation.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="card bg-white p-6 rounded-lg shadow-sm w-full">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className="text-xl font-bold mb-6">{t('reservation.create')}</h2>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              {t('reservation.fullName')}
            </label>
            <input
              id="name"
              type="text"
              className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder={t('reservation.fullName') as string}
              {...register('name', { required: t('reservation.requiredField') as string })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="nationality" className="form-label">
              {t('reservation.nationality')}
            </label>
            <input
              id="nationality"
              type="text"
              className={`form-input ${errors.nationality ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder={t('reservation.nationality') as string}
              {...register('nationality', { required: t('reservation.requiredField') as string })}
            />
            {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="identityNumber" className="form-label">
              {t('reservation.identityNumber')}
            </label>
            <input
              id="identityNumber"
              type="text"
              className={`form-input ${errors.identityNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder={t('reservation.identityNumber') as string}
              {...register('identityNumber', { required: t('reservation.requiredField') as string })}
            />
            {errors.identityNumber && <p className="mt-1 text-sm text-red-600">{errors.identityNumber.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="form-label">
              {t('reservation.phone')}
            </label>
            <input
              id="phone"
              type="tel"
              className={`form-input ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder={t('reservation.phone') as string}
              {...register('phone', { 
                required: t('reservation.requiredField') as string,
                pattern: {
                  value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: t('reservation.invalidPhone') as string,
                } 
              })}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="peopleCount" className="form-label">
              {t('reservation.peopleCount')}
            </label>
            <div className="flex rounded-md">
              <input
                id="peopleCount"
                type="number"
                min="1"
                max="50"
                className={`form-input ${errors.peopleCount ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                {...register('peopleCount', { 
                  required: t('reservation.requiredField') as string,
                  min: {
                    value: 1,
                    message: t('reservation.minPeople') as string || 'Minimum 1 person required',
                  },
                  max: {
                    value: 50,
                    message: t('reservation.maxPeople') as string || 'Maximum 50 people allowed',
                  },
                })}
              />
            </div>
            {errors.peopleCount && <p className="mt-1 text-sm text-red-600">{errors.peopleCount.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="accommodationAddress" className="form-label">
              {t('reservation.accommodationAddress')}
            </label>
            <textarea
              id="accommodationAddress"
              rows={3}
              className={`form-input ${errors.accommodationAddress ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder={t('reservation.accommodationAddress') as string}
              {...register('accommodationAddress', { required: t('reservation.requiredField') as string })}
            />
            {errors.accommodationAddress && <p className="mt-1 text-sm text-red-600">{errors.accommodationAddress.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="tourId" className="form-label">
              {t('reservation.tourSelection')}
            </label>
            <select
              id="tourId"
              className={`form-input ${errors.tourId ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              {...register('tourId', { required: t('reservation.requiredField') as string })}
            >
              <option value="">{t('reservation.tourSelection')}</option>
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.name}
                </option>
              ))}
            </select>
            {errors.tourId && <p className="mt-1 text-sm text-red-600">{errors.tourId.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="tourDate" className="form-label">
              {t('reservation.tourDate')}
            </label>
            <input
              id="tourDate"
              type="date"
              className={`form-input ${errors.tourDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              min={new Date().toISOString().split('T')[0]}
              {...register('tourDate', { required: t('reservation.requiredField') as string })}
            />
            {errors.tourDate && <p className="mt-1 text-sm text-red-600">{errors.tourDate.message}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('common.loading')}
              </span>
            ) : (
              t('common.submit')
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm; 