import React, { useState } from 'react';
import GoogleSignIn from './components/GoogleSignIn';
import ProfileForm from './components/ProfileForm';
import Dashboard from './components/Dashboard';

interface ProfileData {
  name: string;
  age: string;
  weight: string;
  location: string;
}

type AppState = 'signin' | 'profile' | 'dashboard';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('signin');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleSignIn = () => {
    setCurrentState('profile');
  };

  const handleProfileSubmit = (data: ProfileData) => {
    setProfileData(data);
    setCurrentState('dashboard');
  };

  const handleProfileClose = () => {
    // For demo purposes, we'll just go to dashboard with default data
    // In a real app, you might want to sign the user out or keep them on profile
    setCurrentState('signin');
  };

  if (currentState === 'signin') {
    return <GoogleSignIn onSignIn={handleSignIn} />;
  }

  if (currentState === 'profile') {
    return (
      <ProfileForm 
        onSubmit={handleProfileSubmit}
        onClose={handleProfileClose}
      />
    );
  }

  if (currentState === 'dashboard' && profileData) {
    return <Dashboard profileData={profileData} />;
  }

  return <div>Loading...</div>;
}

export default App;