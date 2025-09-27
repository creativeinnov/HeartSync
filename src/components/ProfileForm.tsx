import React, { useState } from 'react';
import { X, User, MapPin, Weight, Calendar, ArrowUpDown } from 'lucide-react';

interface ProfileData {
  name: string;
  age: string;
  weight: string;
  height: string;
  location: string;
}

interface ProfileFormProps {
  onSubmit: (data: ProfileData) => void;
  onClose: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    age: '',
    weight: '',
    height: '',
    location: '',
  });

  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ProfileData]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<ProfileData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else if (parseInt(formData.weight) < 1 || parseInt(formData.weight) > 500) {
      newErrors.weight = 'Please enter a valid weight';
    }
     if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else if (parseInt(formData.weight) < 1 || parseInt(formData.weight) > 500) {
      newErrors.weight = 'Please enter a valid weight';
    }
    if (!formData.height.trim()) {
      newErrors.height = 'Height is required';
    } else if (parseInt(formData.height) < 1 || parseInt(formData.height) > 300) {
      newErrors.height = 'Please enter a valid height';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Age Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your age"
              min="1"
              max="120"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Weight Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Weight className="w-4 h-4 inline mr-2" />
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.weight ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your weight in kg"
              min="1"
              max="500"
            />
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
          </div>

          {/* Height Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ArrowUpDown className="w-4 h-4 inline mr-2" />
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.height ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your height in cm"
              min="1"
              max="500"
            />
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your city/country"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Save Profile & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;