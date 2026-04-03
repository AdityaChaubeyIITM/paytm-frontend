import React from 'react';
import { Wallet, TrendingUp, IndianRupee, Store, ArrowRight, Sparkles } from 'lucide-react';
import { merchantProfiles } from '../data/mockData';

export default function Dashboard({ onNext, profileType, setProfile }) {
  // Fetch the current user's data from our mock database
  const user = merchantProfiles[profileType];

  return (
    <div className="bg-gray-50 min-h-full">
      
      {/* 🔴 DEMO CONTROLS (For Hackathon Judges) */}
      <div className="bg-yellow-100 p-2 text-xs flex justify-between items-center border-b border-yellow-200">
        <span className="font-bold text-yellow-800">Demo Controls:</span>
        <select 
          className="bg-white border border-yellow-300 rounded px-2 py-1 outline-none"
          value={profileType}
          onChange={(e) => setProfile(e.target.value)}
        >
          <option value="good">High-Volume SME (Good)</option>
          <option value="medium">Growing SME (Medium)</option>
        </select>
      </div>

      {/* Header Area */}
      <div className="bg-[#002970] text-white p-6 pb-12 rounded-b-[2rem] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <Store className="text-[#002970] w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl">{user.name}</h1>
              <p className="text-blue-200 text-sm">Paytm Merchant ID: {user.id}</p>
            </div>
          </div>
          <div className="bg-[#00B9F1] rounded-full p-2 cursor-pointer">
            <Wallet className="w-5 h-5 text-white" />
          </div>
        </div>

        <div>
          <p className="text-blue-200 text-sm mb-1">Today's Collections</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-4xl font-extrabold flex items-center">
              <IndianRupee className="w-8 h-8" /> 
              {profileType === 'good' ? '14,250' : '3,420'}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 -mt-6">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-xs mb-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> Monthly Volume
            </div>
            <p className="font-bold text-lg">{user.monthlyVolume}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-xs mb-1">Settlement</div>
            <p className="font-bold text-lg text-green-600">Instant</p>
          </div>
        </div>

        {/* 🚀 THE HOOK: Open Credit OS Banner */}
        <div className="bg-gradient-to-br from-[#F0F8FF] to-[#E6F3FF] border border-blue-100 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#00B9F1] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
            NEW FEATURE
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#00B9F1]" />
            <h3 className="font-bold text-gray-900 text-lg">Smart Credit Line</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 pr-4">
            AI-powered loans tailored to your daily sales. Connect your bank to unlock instant offers from multiple lenders via ULI.
          </p>

          <button 
            onClick={onNext}
            className="w-full bg-[#002970] text-white font-semibold py-3.5 rounded-xl flex justify-center items-center space-x-2 hover:bg-blue-800 transition-colors shadow-md"
          >
            <span>Check Eligibility via AA</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Recent Transactions Stub */}
        <div className="mt-8">
          <h3 className="font-bold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-3 rounded-xl flex justify-between items-center border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Payment Received</p>
                    <p className="text-xs text-gray-400">Today, 10:{i}4 AM</p>
                  </div>
                </div>
                <p className="font-bold text-green-600">+₹{Math.floor(Math.random() * 500) + 100}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}