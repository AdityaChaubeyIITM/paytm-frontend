import React, { useState } from 'react';
import { ShieldCheck, Landmark, FileText, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';

export default function AAConsent({ onNext }) {
  const [isFetching, setIsFetching] = useState(false);

  const handleApprove = () => {
    setIsFetching(true);
    // Simulate API call delay for the judges to see the loading state
    setTimeout(() => {
      setIsFetching(false);
      onNext();
    }, 2500); 
  };

  if (isFetching) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white p-6 text-center space-y-6">
        <Loader2 className="w-16 h-16 text-[#002970] animate-spin" />
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Fetching 360° Profile...</h2>
          <p className="text-gray-500 text-sm">Securely pulling bank statements and GST data via Account Aggregator.</p>
        </div>
        <div className="w-full max-w-xs bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
          <div className="bg-[#00B9F1] h-2 rounded-full animate-pulse w-[70%]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col relative">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center space-x-3 bg-white sticky top-0 z-10">
        <ArrowLeft className="w-6 h-6 text-gray-600 cursor-pointer" onClick={() => window.location.reload()} />
        <h2 className="text-lg font-bold text-gray-800">Secure Data Consent</h2>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {/* AA Network Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>RBI Regulated Account Aggregator</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Connect Your Data</h1>
          <p className="text-gray-500 text-sm">
            Share your financial data to help our AI find the best loan offers across multiple lenders.
          </p>
        </div>

        {/* Data Requested Boxes */}
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-2">Data Requested</h3>
          
          <div className="flex items-start space-x-4 p-4 border border-blue-100 bg-blue-50/50 rounded-2xl">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <Landmark className="w-5 h-5 text-[#002970]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-md">Bank Statements (12 Months)</h4>
              <p className="text-xs text-gray-500 mt-1">HDFC Bank • Account ending in 4092</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto mt-1" />
          </div>

          <div className="flex items-start space-x-4 p-4 border border-blue-100 bg-blue-50/50 rounded-2xl">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <FileText className="w-5 h-5 text-[#002970]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-md">GST Returns (GSTR-3B)</h4>
              <p className="text-xs text-gray-500 mt-1">To verify stable business revenue</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto mt-1" />
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            By clicking approve, you consent to securely share your data with <strong>Paytm Credit OS</strong> from <strong>01-Jan-2023</strong> to <strong>01-Jan-2024</strong>. Data is end-to-end encrypted.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="p-5 bg-white border-t border-gray-100 mt-auto">
        <button 
          onClick={handleApprove}
          className="w-full bg-[#002970] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition-colors flex justify-center items-center space-x-2"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Approve via OTP</span>
        </button>
      </div>

    </div>
  );
}