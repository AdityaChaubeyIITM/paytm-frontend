import React, { useState, useEffect } from 'react';
import { Building2, Percent, CheckCircle, ArrowRight, Network, Wallet } from 'lucide-react';
import { uliOffers } from '../data/mockData';

export default function ULIOffers({ onNext }) {
  const [isBidding, setIsBidding] = useState(true);

  useEffect(() => {
    // Simulate real-time bidding from multiple lenders via ULI
    const timer = setTimeout(() => {
      setIsBidding(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isBidding) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white p-6 text-center space-y-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-32 h-32 border-4 border-[#00B9F1] rounded-full animate-ping opacity-20"></div>
          <div className="absolute w-24 h-24 border-4 border-[#002970] rounded-full animate-ping opacity-40 delay-75"></div>
          <Network className="w-12 h-12 text-[#002970] relative z-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Broadcasting to ULI Network...</h2>
          <p className="text-gray-500 text-sm">Receiving real-time loan offers from HDFC, SBI, Bajaj, and 10+ others.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col relative">
      
      {/* Header */}
      <div className="bg-white p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Lender Offers</h2>
          <p className="text-xs text-gray-500 font-semibold flex items-center mt-1">
            <Network className="w-3 h-3 mr-1 text-[#00B9F1]" /> Powered by ULI
          </p>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
          3 Offers Found
        </div>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        
        <p className="text-sm text-gray-600 mb-2">Select the best credit line for your business needs.</p>

        {/* Offer Cards */}
        {uliOffers.map((offer, index) => (
          <div 
            key={index} 
            className={`relative bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer ${
              index === 0 
                ? 'border-[#00B9F1] shadow-md ring-4 ring-blue-50' 
                : 'border-gray-100 shadow-sm hover:border-blue-200'
            }`}
            onClick={() => onNext(offer)} // Passing the selected offer to the next step
          >
            {/* AI Recommendation Badge for the top offer */}
            {index === 0 && (
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#002970] to-[#00B9F1] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" /> AI BEST MATCH
              </div>
            )}

            <div className="flex justify-between items-start mb-4 mt-1">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${index === 0 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Building2 className={`w-6 h-6 ${index === 0 ? 'text-[#002970]' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{offer.lender}</h3>
                  <p className="text-xs text-gray-500">{offer.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Match Score</p>
                <p className={`font-bold text-lg ${index === 0 ? 'text-green-600' : 'text-gray-700'}`}>
                  {offer.matchScore}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-xl">
              <div>
                <p className="text-xs text-gray-500 flex items-center mb-1">
                  <Wallet className="w-3 h-3 mr-1" /> Amount
                </p>
                <p className="font-bold text-gray-900">{offer.amount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 flex items-center mb-1">
                  <Percent className="w-3 h-3 mr-1" /> Interest
                </p>
                <p className="font-bold text-gray-900">{offer.interestRate}</p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-600 font-medium">Repayment: <span className="font-bold text-gray-900">{offer.repaymentType}</span></p>
              <ArrowRight className={`w-5 h-5 ${index === 0 ? 'text-[#00B9F1]' : 'text-gray-400'}`} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}