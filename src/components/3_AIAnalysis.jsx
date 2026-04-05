import React, { useState } from 'react';
import { BrainCircuit, CheckCircle2, Loader2, Database, ShieldCheck, AlertOctagon, ArrowRight } from 'lucide-react';
import { merchantProfiles } from '../data/mockData';

export default function AIAnalysis({ onNext, profileType, updateProfileData }) {
  // Stages: 'SHOW_AA_DATA' -> 'ANALYZING' -> 'ERROR_WARNING' -> 'RESULTS'
  const [stage, setStage] = useState('SHOW_AA_DATA');
  
  // Bulletproof fallback to prevent white screens if profileType gets lost
  const safeProfileType = profileType || 'good';
  const merchantData = merchantProfiles[safeProfileType];

  // --- CREDIBLE DATA INJECTION ---
  // If your mockData doesn't have the XGBoost keys, we use these realistic numbers for the demo
  const credibleAAData = {
    good: { capital: 1250000, taxDefaults: 0, vintage: 5 },
    medium: { capital: 450000, taxDefaults: 1, vintage: 2 },
    bad: { capital: 80000, taxDefaults: 3, vintage: 1 }
  };
  const displayData = credibleAAData[safeProfileType] || credibleAAData.good;

  const triggerAI = async () => {
    setStage('ANALYZING');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch("https://paytm-klvx.onrender.com/predict", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'paytm_hackathon_secret_2026'
        },
        // We pass the credible data mixed with your mock data so the backend has numbers to chew on
        body: JSON.stringify({ data: { 
          ...merchantData, 
          Paid_in_capital: merchantData?.Paid_in_capital || displayData.capital,
          Overdue_tax_num_1year: merchantData?.Overdue_tax_num_1year ?? displayData.taxDefaults,
          Establishment_Duration: merchantData?.Establishment_Duration || displayData.vintage
        }}),
        signal: controller.signal
      });

      if (!response.ok) throw new Error("Backend Error");
      
      const result = await response.json();
      clearTimeout(timeoutId);

      updateProfileData(safeProfileType, {
        eligibleLimit: result.credit_limit || merchantData.eligibleLimit,
        creditScore: result.credit_score || merchantData.creditScore,
        aiInsights: Array.isArray(result.insights) && result.insights.length > 0 ? result.insights : merchantData.aiInsights,
        riskProfile: result.risk_profile || merchantData.riskProfile
      });

      setStage('RESULTS');

    } catch (err) {
      console.warn("AI Engine failed, triggering explicit warning.");
      setStage('ERROR_WARNING');
      setTimeout(() => {
        setStage('RESULTS');
      }, 3500);
    }
  };

  const insightsToRender = Array.isArray(merchantData?.aiInsights) 
    ? merchantData.aiInsights 
    : ["Strong repayment probability", "Stable cashflow history", "Verified GST details"];

  // --- STAGE 1: ACCOUNT AGGREGATOR DATA ---
  if (stage === 'SHOW_AA_DATA') {
    return (
      <div className="h-full bg-gray-50 flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center space-x-2 mb-8">
          <Database className="w-6 h-6 text-[#002970]" />
          <h2 className="text-xl font-bold text-gray-800">Account Aggregator Data</h2>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center space-x-2 mb-4 text-green-600 font-bold bg-green-50 p-3 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
            <span>ULI Data Successfully Fetched</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Paid-in Capital</span>
              {/* Uses real data if it exists, otherwise uses our credible fallback map */}
              <span className="font-bold">₹{(merchantData?.Paid_in_capital || displayData.capital).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Tax Defaults (1 Yr)</span>
              <span className={`font-bold ${(merchantData?.Overdue_tax_num_1year ?? displayData.taxDefaults) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {merchantData?.Overdue_tax_num_1year ?? displayData.taxDefaults}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Business Vintage</span>
              <span className="font-bold">{merchantData?.Establishment_Duration || displayData.vintage} Years</span>
            </div>
          </div>
        </div>

        <button 
          onClick={triggerAI} 
          className="mt-auto w-full bg-[#002970] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 hover:bg-blue-900 transition-all"
        >
          <BrainCircuit className="w-5 h-5" />
          <span>Pass Data to AI Prediction Engine</span>
        </button>
      </div>
    );
  }

  // --- STAGE 2: LOADING ---
  if (stage === 'ANALYZING') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
        <Loader2 className="w-20 h-20 text-[#00B9F1] animate-spin mb-6" />
        <h2 className="text-2xl font-bold mb-2">XGBoost & Perplexity Processing...</h2>
        <p className="text-gray-400 text-sm animate-pulse">Computing Risk Probability Map</p>
      </div>
    );
  }

  // --- STAGE 3: EXPLICIT ERROR NOTIFICATION ---
  if (stage === 'ERROR_WARNING') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-red-50 p-6 text-center">
        <AlertOctagon className="w-24 h-24 text-red-500 mb-6 animate-pulse" />
        <h2 className="text-2xl font-bold text-red-700 mb-4">AI Backend Unavailable</h2>
        <p className="text-red-600 mb-8 font-medium">
          Failed to establish connection with Perplexity/Render. 
        </p>
        <p className="text-gray-600 text-sm font-bold flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Proceeding with prototype cache...</span>
        </p>
      </div>
    );
  }

  // --- STAGE 4: FINAL RESULTS ---
  return (
    <div className="h-full bg-gray-50 flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-6">
        <div className="bg-[#002970] p-2 rounded-lg text-white"><BrainCircuit className="w-5 h-5" /></div>
        <h2 className="text-xl font-bold text-gray-800">AI Verified Analysis</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 text-center">
        <p className="text-gray-500 text-xs uppercase mb-2 font-bold tracking-widest">Risk Score</p>
        <div className="text-6xl font-black text-[#002970] mb-2">{merchantData.creditScore}</div>
        <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${merchantData.riskProfile === 'Low' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {merchantData.riskProfile} Risk
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {insightsToRender.map((insight, index) => (
          <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-[#00B9F1] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 font-medium">{insight}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#002970] rounded-2xl p-6 text-white text-center mb-6 shadow-xl">
        <p className="text-blue-200 text-sm mb-1">Approved Credit Line</p>
        <h2 className="text-4xl font-extrabold">₹{(merchantData.eligibleLimit / 100000 || 0).toFixed(1)} Lakh</h2>
      </div>

      <button onClick={onNext} className="w-full bg-[#00B9F1] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-none transition-all mt-auto flex justify-center items-center space-x-2">
        <span>View Lender Offers</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
