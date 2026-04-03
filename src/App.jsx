// src/App.jsx
import React, { useState } from 'react';
import Dashboard from './components/1_Dashboard';
import AAConsent from './components/2_AAConsent';
import AIAnalysis from './components/3_AIAnalysis';
import ULIOffers from './components/4_ULIOffers';
import Soundbox from './components/5_Soundbox';
import Repayment from './components/6_Repayment';

export default function App() {
  // Steps: 'dashboard' | 'consent' | 'analysis' | 'offers' | 'soundbox' | 'repayment'
  const [currentStep, setCurrentStep] = useState('dashboard');
  const [selectedProfile, setSelectedProfile] = useState('good'); // Default to the good profile
  const [selectedOffer, setSelectedOffer] = useState(null);

  const navigateTo = (step) => setCurrentStep(step);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      {/* Mobile Frame to simulate an app experience */}
      <div className="w-full max-w-md bg-white h-[850px] shadow-2xl rounded-[40px] overflow-hidden border-8 border-gray-900 relative">
        
        {/* Status Bar Mock */}
        <div className="bg-blue-900 text-white text-xs px-6 py-2 flex justify-between items-center">
          <span>9:41</span>
          <div className="flex space-x-2">
            <span>5G</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Dynamic Journey Rendering */}
        <div className="h-full overflow-y-auto pb-20">
          {currentStep === 'dashboard' && (
            <Dashboard 
              onNext={() => navigateTo('consent')} 
              profileType={selectedProfile}
              setProfile={setSelectedProfile} 
            />
          )}
          {currentStep === 'consent' && (
             <AAConsent onNext={() => navigateTo('analysis')} />
          )}
          {currentStep === 'analysis' && (
             <AIAnalysis onNext={() => navigateTo('offers')} profileType={selectedProfile} />
          )}
          {currentStep === 'offers' && (
             <ULIOffers 
               onNext={(offer) => {
                 setSelectedOffer(offer);
                 navigateTo('soundbox');
               }} 
             />
          )}
          {currentStep === 'soundbox' && (
             <Soundbox 
               offer={selectedOffer} 
               onNext={() => navigateTo('repayment')} 
             />
          )}
          {currentStep === 'repayment' && (
             <Repayment 
               offer={selectedOffer} 
               onReset={() => navigateTo('dashboard')} 
             />
          )}
        </div>
      </div>
    </div>
  );
}