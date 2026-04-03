import React, { useState, useEffect } from 'react';
import { Volume2, Mic, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Soundbox({ offer, onNext }) {
  const [voiceState, setVoiceState] = useState('speaking'); // 'speaking' | 'listening' | 'success'

  useEffect(() => {
    // Sequence 1: Soundbox announces the offer
    if (voiceState === 'speaking') {
      const timer = setTimeout(() => {
        setVoiceState('listening');
      }, 3500);
      return () => clearTimeout(timer);
    }
    
    // Sequence 3: Success state before auto-routing
    if (voiceState === 'success') {
      const timer = setTimeout(() => {
        onNext();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [voiceState, onNext]);

  const handleSimulatedVoice = () => {
    if (voiceState === 'listening') {
      setVoiceState('success');
    }
  };

  return (
    <div className="h-full bg-[#002970] flex flex-col items-center justify-center relative overflow-hidden text-white p-6">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-400 rounded-full opacity-10"></div>

      {/* Header Info */}
      <div className="absolute top-8 text-center z-10 w-full px-6">
        <h2 className="text-blue-200 text-sm font-bold tracking-widest uppercase mb-1">Paytm Soundbox 3.0</h2>
        <div className="bg-white/10 backdrop-blur-md rounded-full py-1.5 px-4 inline-block text-xs font-medium">
          Voice-First Lending
        </div>
      </div>

      {/* The Soundbox Visual */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-48 h-64 bg-gray-900 rounded-3xl border-8 border-gray-800 shadow-2xl flex flex-col items-center justify-between p-4 mb-12 relative overflow-hidden">
          
          {/* Soundbox Grill */}
          <div className="w-full h-32 flex flex-wrap justify-center content-start gap-1 p-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gray-700 rounded-full"></div>
            ))}
          </div>

          {/* Paytm Branding Mock */}
          <div className="bg-[#00B9F1] w-12 h-4 rounded-full mb-2"></div>

          {/* Dynamic Sound Waves */}
          {voiceState === 'speaking' && (
            <div className="absolute bottom-16 flex items-end space-x-1 h-8">
              <div className="w-1.5 bg-[#00B9F1] rounded-full animate-[bounce_0.8s_infinite] h-8"></div>
              <div className="w-1.5 bg-[#00B9F1] rounded-full animate-[bounce_1.2s_infinite] h-4"></div>
              <div className="w-1.5 bg-[#00B9F1] rounded-full animate-[bounce_0.9s_infinite] h-6"></div>
              <div className="w-1.5 bg-[#00B9F1] rounded-full animate-[bounce_1.5s_infinite] h-3"></div>
            </div>
          )}
        </div>

        {/* Dynamic Text and Actions */}
        <div className="text-center h-32">
          {voiceState === 'speaking' && (
            <div className="animate-fade-in">
              <Volume2 className="w-8 h-8 text-[#00B9F1] mx-auto mb-3 animate-pulse" />
              <p className="text-xl font-medium leading-relaxed">
                "You have an approved {offer?.amount} loan from {offer?.lender} at {offer?.interestRate}. Say <span className="font-bold text-[#00B9F1]">'Accept'</span> to disburse."
              </p>
            </div>
          )}

          {voiceState === 'listening' && (
            <div className="animate-fade-in flex flex-col items-center">
              <p className="text-lg text-blue-200 mb-6">Listening for your command...</p>
              
              {/* Interaction Button for Judges */}
              <button 
                onClick={handleSimulatedVoice}
                className="bg-[#00B9F1] hover:bg-blue-400 text-white rounded-full p-5 shadow-[0_0_30px_rgba(0,185,241,0.5)] transition-all animate-pulse flex items-center space-x-3"
              >
                <Mic className="w-6 h-6" />
                <span className="font-bold">Tap to say "Accept"</span>
              </button>
            </div>
          )}

          {voiceState === 'success' && (
            <div className="animate-fade-in flex flex-col items-center">
              <div className="bg-green-500 rounded-full p-4 mb-3 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <p className="text-xl font-bold text-green-400">"Voice Verified. Loan Disbursed!"</p>
            </div>
          )}
        </div>
      </div>

      {/* Skip/Next for safety during demo */}
      <div className="absolute bottom-6 right-6 z-10">
         <button 
           onClick={onNext}
           className="text-white/50 hover:text-white flex items-center text-xs font-bold transition-colors"
         >
           Skip <ArrowRight className="w-3 h-3 ml-1" />
         </button>
      </div>
      
    </div>
  );
}