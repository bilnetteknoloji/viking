import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  GlobeAltIcon,
  IdentificationIcon,
  PhoneIcon,
  UserGroupIcon,
  HomeIcon,
  CalendarDaysIcon,
  ArrowLeftIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface PersonData {
  id: string;
  fullName: string;
  nationality: string;
  identityNumber: string;
}

const ReservationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPerson, setCurrentPerson] = useState<PersonData>({
    id: '',
    fullName: '',
    nationality: '',
    identityNumber: ''
  });
  
  const [formData, setFormData] = useState({
    phone: '',
    peopleCount: '1',
    accommodationAddress: '',
    tourDate: ''
  });

  const [people, setPeople] = useState<PersonData[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Form geçerliliğini kontrol et
    const totalPeople = parseInt(formData.peopleCount);
    setIsFormValid(
      people.length === totalPeople &&
      formData.phone.trim() !== '' &&
      formData.accommodationAddress.trim() !== '' &&
      formData.tourDate !== ''
    );
  }, [formData, people]);

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPerson(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMainFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPerson.fullName && currentPerson.nationality && currentPerson.identityNumber) {
      setPeople(prev => [...prev, { ...currentPerson, id: Date.now().toString() }]);
      setCurrentPerson({
        id: '',
        fullName: '',
        nationality: '',
        identityNumber: ''
      });
    }
  };

  const handleRemovePerson = (id: string) => {
    setPeople(prev => prev.filter(person => person.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // API entegrasyonu burada yapılacak
      console.log('Form data:', { ...formData, people });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 px-4">
      {/* Header - Mobil Optimize */}
      <div className="max-w-xl mx-auto mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          <span className="text-sm">Geri Dön</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Ön Rezervasyon</h1>
          <p className="text-sm text-gray-600">Viking Ölüdeniz Tekne Turu için rezervasyon yapın</p>
        </div>
      </div>

      {/* Ana Form ve Kişi Listesi - Mobil Optimize */}
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
          {/* İletişim Bilgileri Formu */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">İletişim Bilgileri</h2>
            <div className="space-y-4">
              {/* Telefon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon Numarası
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleMainFormChange}
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+90 XXX XXX XX XX"
                  />
                </div>
              </div>

              {/* Kişi Sayısı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kişi Sayısı
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserGroupIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    name="peopleCount"
                    value={formData.peopleCount}
                    onChange={handleMainFormChange}
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} Kişi</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Konaklama Adresi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konaklama Adresi
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HomeIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="accommodationAddress"
                    value={formData.accommodationAddress}
                    onChange={handleMainFormChange}
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ölüdeniz'deki konaklama adresiniz"
                  />
                </div>
              </div>

              {/* Tur Tarihi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tur Tarihi
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="tourDate"
                    value={formData.tourDate}
                    onChange={handleMainFormChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kişi Ekleme Formu */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Kişi Bilgileri</h2>
            <form onSubmit={handleAddPerson} className="space-y-4">
              {/* İsim Soyisim */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İsim Soyisim
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={currentPerson.fullName}
                    onChange={handlePersonChange}
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Adı ve Soyadı"
                  />
                </div>
              </div>

              {/* Uyruk */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Uyruk
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="nationality"
                    value={currentPerson.nationality}
                    onChange={handlePersonChange}
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Uyruğu"
                  />
                </div>
              </div>

              {/* TC/Pasaport No */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TC Kimlik No / Pasaport No
                </label>
                <div className="flex space-x-2">
                  <div className="relative rounded-lg flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IdentificationIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="identityNumber"
                      value={currentPerson.identityNumber}
                      onChange={handlePersonChange}
                      required
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Kimlik/Pasaport No"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Kişi Listesi */}
          {people.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-800 mb-3">
                Eklenen Kişiler ({people.length}/{formData.peopleCount})
              </h3>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            İsim
                          </th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Uyruk
                          </th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kimlik No
                          </th>
                          <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            İşlem
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {people.map((person) => (
                          <tr key={person.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                              {person.fullName}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                              {person.nationality}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                              {person.identityNumber}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-right">
                              <button
                                onClick={() => handleRemovePerson(person.id)}
                                className="text-red-600 hover:text-red-800 transition-colors p-1"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gönder Butonu */}
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white transition-all transform active:scale-[0.98] ${
                isFormValid 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isFormValid ? 'Rezervasyonu Tamamla' : `${people.length}/${formData.peopleCount} Kişi Eklendi`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage; 