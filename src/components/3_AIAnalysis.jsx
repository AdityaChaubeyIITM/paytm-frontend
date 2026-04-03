import React, { useState, useEffect } from 'react';
import { BrainCircuit, CheckCircle2, Loader2, Database, ShieldCheck } from 'lucide-react';
import { merchantProfiles } from '../data/mockData';

export default function AIAnalysis({ onNext, profileType, updateProfileData }) {
  const [analysisStage, setAnalysisStage] = useState('FETCHING_DATA'); 
  const merchantData = merchantProfiles[profileType];

  useEffect(() => {
    const runAIEngine = async () => {
      // Stage 1: Simulate Account Aggregator (AA) Fetch (1.5 seconds)
      setTimeout(async () => {
        setAnalysisStage('RUNNING_MODEL');
        
        try {
          const response = await fetch("https://paytm-klvx.onrender.com/predict", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': 'paytm_hackathon_secret_2026'
            },
            body: JSON.stringify({ data: merchantData }),
          });

          const result = await response.json();
          
          updateProfileData(profileType, {
            eligibleLimit: result.credit_limit,
            creditScore: result.credit_score,
            aiInsights: result.insights,
            riskProfile: result.risk_profile
          });
        } catch (err) {
          console.log("Using cached data for demo safety");
        } finally {
          // Final delay for the "Big Reveal"
          setTimeout(() => setAnalysisStage('COMPLETED'), 1500);
        }
      }, 1500);
    };

    runAIEngine();
  }, [profileType, updateProfileData, merchantData]);

  // --- LOADING STATES ---
  if (analysisStage === 'FETCHING_DATA' || analysisStage === 'RUNNING_MODEL') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-[#00B9F1] blur-3xl opacity-20 rounded-full animate-pulse"></div>
          {analysisStage === 'FETCHING_DATA' ? 
            <Database className="w-20 h-20 text-[#00B9F1] animate-bounce relative z-10" /> : 
            <BrainCircuit className="w-24 h-24 text-[#00B9F1] animate-pulse relative z-10" />
          }
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00B9F1] to-blue-400">
            {analysisStage === 'FETCHING_DATA' ? "Accessing Account Aggregator..." : "Smart Engine Analyzing..."}
          </h2>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-400 text-sm flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-500" /> Secure ULI Handshake Initialized
            </p>
            <p className={`text-sm flex items-center ${analysisStage === 'RUNNING_MODEL' ? 'text-blue-400 font-bold' : 'text-gray-500'}`}>
              <Loader2 className={`w-4 h-4 mr-2 ${analysisStage === 'RUNNING_MODEL' ? 'animate-spin' : ''}`} /> Assessing Credit Vintage & Tax Data
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- RESULTS STATE ---
  return (
    <div className="h-full bg-gray-50 flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-6">
        <div className="bg-[#002970] p-2 rounded-lg text-white"><BrainCircuit className="w-5 h-5" /></div>
        <h2 className="text-xl font-bold text-gray-800">ULI Verified Analysis</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 text-center">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">Risk Assessment Score</p>
        <div className="text-6xl font-black text-[#002970] mb-2">{merchantData.creditScore}</div>
        <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${
          merchantData.riskProfile === 'Low' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {merchantData.riskProfile} Risk Profile
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-tighter">AI Cashflow Insights</h3>
        <div className="space-y-3">
          {merchantData.aiInsights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-[#00B9F1] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-[#002970] rounded-2xl p-6 text-white shadow-lg text-center mb-6">
        <p className="text-blue-200 text-sm mb-1 font-medium">Eligible Credit Line</p>
        <h2 className="text-4xl font-extrabold mb-2">₹{(merchantData.eligibleLimit / 100000).toFixed(1)} Lakh</h2>
      </div>

      <button onClick={onNext} className="w-full bg-[#00B9F1] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-500 transition-all mt-auto">
        View Lender Offers
      </button>
    </div>
  );
}