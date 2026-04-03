import React from 'react';
import { CheckCircle, IndianRupee, TrendingDown, Activity, Calendar, RotateCcw, Wallet } from 'lucide-react';

export default function Repayment({ offer, onReset }) {
  // Fallback in case no offer was selected
  const displayOffer = offer || { amount: '₹5,00,000', lender: 'HDFC Bank', interestRate: '12.5%' };

  return (
    <div className="h-full bg-gray-50 flex flex-col relative">
      
      {/* Success Header */}
      <div className="bg-green-600 p-8 pt-12 text-center rounded-b-[2.5rem] shadow-lg text-white">
        <div className="bg-white rounded-full p-3 inline-block mb-4 shadow-sm">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-extrabold mb-1">Disbursal Successful!</h2>
        <p className="text-green-100 text-sm">{displayOffer.amount} credited to your settlement account.</p>
      </div>

      <div className="p-5 -mt-6 flex-1 overflow-y-auto">
        
        {/* Loan Summary Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mb-6 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Active Credit Line</p>
            <h3 className="text-xl font-bold text-gray-900">{displayOffer.lender}</h3>
            <p className="text-sm text-gray-600 mt-1">@ {displayOffer.interestRate}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex flex-col items-center justify-center">
            <Wallet className="w-6 h-6 text-[#002970] mb-1" />
            <span className="text-xs font-bold text-[#002970]">Active</span>
          </div>
        </div>

        {/* 🚀 THE HOOK: Dynamic AI Repayment Vis */}
        <div className="bg-gradient-to-br from-[#002970] to-blue-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden mb-6">
          <div className="absolute top-0 right-0 bg-[#00B9F1] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
            AI MANAGED
          </div>
          
          <h3 className="font-bold text-lg mb-1 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-[#00B9F1]" /> 
            Dynamic Daily Deduction
          </h3>
          <p className="text-blue-200 text-xs mb-5">Your repayment auto-adjusts based on today's Paytm collections.</p>

          <div className="space-y-4">
            {/* High Sales Day Simulation */}
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-blue-100 flex items-center"><TrendingDown className="w-4 h-4 mr-1 text-green-400 transform rotate-180" /> High Sales Day</span>
                <span className="text-xs text-blue-300">Today</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-blue-200 uppercase">Collections</p>
                  <p className="font-bold">₹14,250</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-blue-200 uppercase">Deduction (5%)</p>
                  <p className="font-bold text-[#00B9F1] text-lg">- ₹712</p>
                </div>
              </div>
            </div>

            {/* Low Sales Day Simulation */}
            <div className="bg-black/20 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300 flex items-center"><TrendingDown className="w-4 h-4 mr-1 text-red-400" /> Slow Sales Day</span>
                <span className="text-xs text-gray-500">Simulation</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Collections</p>
                  <p className="font-semibold text-gray-300">₹3,000</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase">Deduction (AI Reduced)</p>
                  <p className="font-bold text-gray-300">- ₹150</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Reset Prototype Button */}
      <div className="p-5 bg-white border-t border-gray-100 mt-auto">
        <button 
          onClick={onReset}
          className="w-full bg-white border-2 border-[#002970] text-[#002970] font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors flex justify-center items-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Restart Demo</span>
        </button>
      </div>

    </div>
  );
}