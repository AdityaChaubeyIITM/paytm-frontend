// src/data/mockData.js

export const merchantProfiles = {
  good: {
    id: "M001",
    name: "Sharma Kirana Store",
    monthlyVolume: "₹4.5L",
    creditScore: 780,
    riskProfile: "Low",
    aiInsights: [
      "Consistent daily cashflow detected.",
      "Zero defaults in past 12 months.",
      "High weekend transaction volume."
    ],
    eligibleLimit: 500000,
  },
  medium: {
    id: "M002",
    name: "Rao Electronics",
    monthlyVolume: "₹1.2L",
    creditScore: 650,
    riskProfile: "Medium",
    aiInsights: [
      "Seasonal sales spikes detected.",
      "Occasional late vendor payments.",
      "Growing month-on-month revenue."
    ],
    eligibleLimit: 150000,
  }
};

export const uliOffers = [
  {
    lender: "HDFC Bank",
    type: "Smart Credit Line",
    amount: "₹5,00,000",
    interestRate: "12.5% p.a.",
    repaymentType: "Dynamic Daily (AI Adjusted)",
    matchScore: 98,
    badge: "Best Match"
  },
  {
    lender: "Bajaj Finserv",
    type: "Term Loan",
    amount: "₹4,50,000",
    interestRate: "14.0% p.a.",
    repaymentType: "Fixed EMI",
    matchScore: 85,
    badge: "Fast Disbursal"
  },
  {
    lender: "LendingKart",
    type: "Working Capital",
    amount: "₹5,00,000",
    interestRate: "15.5% p.a.",
    repaymentType: "Weekly Fixed",
    matchScore: 72,
    badge: "Flexible"
  }
];