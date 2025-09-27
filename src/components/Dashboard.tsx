import React from 'react';
import { Heart, Activity, TrendingUp, User, MapPin, Weight, Calendar, Bell, Settings, ArrowUpDown } from 'lucide-react';
import HeartRateChart from './HeartRateChart';
import StatCard from './StatCard';

interface ProfileData {
  name: string;
  age: string;
  weight: string;
  height: string;
  location: string;
}

interface DashboardProps {
  profileData: ProfileData;
}

const Dashboard: React.FC<DashboardProps> = ({ profileData }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const heartRateData = [
    { time: '6:00', value: 65 },
    { time: '8:00', value: 72 },
    { time: '10:00', value: 68 },
    { time: '12:00', value: 75 },
    { time: '14:00', value: 82 },
    { time: '16:00', value: 78 },
    { time: '18:00', value: 71 },
    { time: '20:00', value: 69 },
  ];

  const calculateBMI = () => {
    const weightKg = parseInt(profileData.weight);
    const heightM = (parseInt(profileData.height)) / 100; 
    const bmi = weightKg / (heightM * heightM);
    return bmi.toFixed(1);
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { status: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { status: 'Overweight', color: 'text-yellow-600' };
    return { status: 'Obese', color: 'text-red-600' };
  };

  const bmi = parseFloat(calculateBMI());
  const bmiStatus = getBMIStatus(bmi);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-lg mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HeartSync</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{profileData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profileData.name.split(' ')[0]}!</h2>
          <p className="text-gray-600">{currentDate} • {currentTime}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Current Heart Rate"
            value="72"
            unit="BPM"
            icon={<Heart className="w-6 h-6 text-red-500" />}
            trend="+2%"
            trendUp={true}
            color="red"
          />
          <StatCard
            title="Avg Heart Rate"
            value="68"
            unit="BPM"
            icon={<Activity className="w-6 h-6 text-blue-500" />}
            trend="Normal"
            trendUp={true}
            color="blue"
          />
          <StatCard
            title="BMI"
            value={calculateBMI()}
            unit=""
            icon={<Weight className="w-6 h-6 text-green-500" />}
            trend={bmiStatus.status}
            trendUp={bmi >= 18.5 && bmi < 25}
            color="green"
          />
          <StatCard
            title="Daily Steps"
            value="8,432"
            unit=""
            icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
            trend="+15%"
            trendUp={true}
            color="purple"
          />
        </div>

        {/* Charts and Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Heart Rate Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Heart Rate Today</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Heart Rate</span>
                </div>
              </div>
              <HeartRateChart data={heartRateData} />
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{profileData.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium text-gray-900">{profileData.age} years</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Weight className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-medium text-gray-900">{profileData.weight} kg</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ArrowUpDown className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="font-medium text-gray-900">{profileData.height} cm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{profileData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Heart Health</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Excellent
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">BMI Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    bmiStatus.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                    bmiStatus.status === 'Underweight' ? 'bg-blue-100 text-blue-800' :
                    bmiStatus.status === 'Overweight' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {bmiStatus.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Activity Level</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;