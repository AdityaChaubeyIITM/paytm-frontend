import React, { useState, useEffect } from 'react';
import { BrainCircuit, CheckCircle2, Loader2, Database, ShieldCheck, AlertTriangle } from 'lucide-react';
import { merchantProfiles } from '../data/mockData';

export default function AIAnalysis({ onNext, profileType, updateProfileData }) {
  const [analysisStage, setAnalysisStage] = useState('FETCHING_DATA');
  const [showFallbackNote, setShowFallbackNote] = useState(false);
  const merchantData = merchantProfiles[profileType];

  useEffect(() => {
    const runAIEngine = async () => {
      // Stage 1: ULI Handshake (Simulated)
      await new Promise(resolve => setTimeout(resolve, 1200));
      setAnalysisStage('SHOWING_DATA');
      
      // Stage 2: Preview Raw Data (Simulated)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalysisStage('RUNNING_MODEL');

      // Stage 3: Actual Backend Call with a 5-second Timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch("https://paytm-klvx.onrender.com/predict", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'paytm_hackathon_secret_2026'
          },
          body: JSON.stringify({ data: merchantData }),
          signal: controller.signal
        });

        if (!response.ok) throw new Error("Server Error");
        
        const result = await response.json();
        clearTimeout(timeoutId);

        updateProfileData(profileType, {
          eligibleLimit: result.credit_limit,
          creditScore: result.credit_score,
          aiInsights: result.insights,
          riskProfile: result.risk_profile
        });

      } catch (err) {
        console.warn("Backend unavailable, using prototype fallback");
        setShowFallbackNote(true);
        // We do NOT call updateProfileData here because the mockData.js 
        // already contains the default values for the profile.
      } finally {
        setTimeout(() => setAnalysisStage('COMPLETED'), 1000);
      }
    };

    runAIEngine();
  }, [profileType]);

  // --- STAGE 1 & 3: LOADING SCREENS ---
  if (analysisStage === 'FETCHING_DATA' || analysisStage === 'RUNNING_MODEL') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
        {analysisStage === 'FETCHING_DATA' ? 
          <Database className="w-20 h-20 text-[#00B9F1] animate-bounce mb-6" /> : 
          <BrainCircuit className="w-20 h-20 text-[#00B9F1] animate-pulse mb-6" />
        }
        <h2 className="text-2xl font-bold mb-2">
          {analysisStage === 'FETCHING_DATA' ? "ULI Handshake..." : "AI Engine Crunching..."}
        </h2>
        <p className="text-gray-400 text-sm animate-pulse">
          {analysisStage === 'FETCHING_DATA' ? "Pulling GST & Bank Records" : "Calculating Risk Probability"}
        </p>
      </div>
    );
  }

  // --- STAGE 2: DATA PREVIEW (The "Proof") ---
  if (analysisStage === 'SHOWING_DATA') {
    return (
      <div className="h-full flex flex-col bg-gray-900 text-white p-6">
        <div className="flex items-center space-x-2 mb-8">
          <ShieldCheck className="text-green-400 w-6 h-6" />
          <h2 className="text-xl font-bold">AA Data Received</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Paid-in Capital</p>
            <p className="text-lg font-bold">₹{merchantData.Paid_in_capital.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">GSTR Status</p>
            <p className="text-lg font-bold text-green-400">Clear</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Tax Defaults</p>
            <p className="text-lg font-bold text-red-400">{merchantData.Overdue_tax_num_1year}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Vintage</p>
            <p className="text-lg font-bold">{merchantData.Establishment_Duration} Yrs</p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-center text-[#00B9F1] space-x-2 animate-pulse font-bold">
          <BrainCircuit className="w-5 h-5" />
          <span>Starting Prediction Model...</span>
        </div>
      </div>
    );
  }

  // --- STAGE 4: FINAL RESULTS ---
  return (
    <div className="h-full bg-gray-50 flex flex-col p-6 overflow-y-auto relative">
      {/* "OFFLINE" POPUP NOTIFICATION */}
      {showFallbackNote && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 bg-amber-50 border border-amber-200 p-3 rounded-xl shadow-lg z-50 flex items-center space-x-3 animate-bounce">
          <AlertTriangle className="text-amber-600 w-5 h-5 flex-shrink-0" />
          <p className="text-[10px] leading-tight text-amber-800 font-medium">
            Backend connection slow. Displaying high-fidelity prototype predictions.
          </p>
        </div>
      )}

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
        {merchantData.aiInsights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-[#00B9F1] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 font-medium">{insight}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#002970] rounded-2xl p-6 text-white text-center mb-6 shadow-xl">
        <p className="text-blue-200 text-sm mb-1">Approved Credit Line</p>
        <h2 className="text-4xl font-extrabold">₹{(merchantData.eligibleLimit / 100000).toFixed(1)} Lakh</h2>
      </div>

      <button onClick={onNext} className="w-full bg-[#00B9F1] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-none transition-all mt-auto">
        View Lender Offers
      </button>
    </div>
  );
}