import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Chatbot from '../components/Chatbot';
import { searchApollo, searchCompanies, getApolloUsers } from '../services/apollo';
import type { ApolloPerson, ApolloCompany, ApolloUser } from '../services/apollo';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  city: string;
  region: string;
  type: string;
  createdAt: string;
}

interface Stats {
  totalContacts: number;
  typeStats: { _id: string; count: number }[];
  regionStats: { _id: string; count: number }[];
  cityStats: { _id: string; count: number }[];
}

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  role: 'Internship' | 'Full-time' | 'Contract';
  portfolio: string;
  skills: string;
  motivation: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
}

// Groq AI Helper Function
const generateAIResponse = async (data: any, promptType: 'reply' | 'summary' | 'market_research' | 'custom', customPrompt?: string): Promise<string> => {
  // Use backend proxy for AI generation
  const systemPrompt = getSystemPrompt(promptType);
  const userPrompt = getUserPrompt(data, promptType, customPrompt);

  try {
    const response = await axios.post(`${API_URL}/api/integrations/ai/generate`, {
        systemPrompt,
        userPrompt
    });

    return response.data.content || 'Unable to generate response';
  } catch (error) {
    console.error('Groq AI Error (via Backend):', error);
    throw error;
  }
};

const getSystemPrompt = (type: string) => {
    switch(type) {
        case 'reply': return `You are grow+ AI, the intelligent assistant for Grow+, a creative marketing agency. Write personalized, warm, and professional email replies. Keep responses concise but helpful. Sign off as "grow+ Team".`;
        case 'summary': return `You are a data analyst. Provide concise, actionable insights.`;
        case 'market_research': return `You are a Market Research Expert. specific in finding leads and company data. You are helping a user search a database (Apollo.io).`;
        default: return `You are grow+ AI, the intelligent assistant for Grow+.`;
    }
}

const getUserPrompt = (data: any, type: string, custom?: string) => {
    if (type === 'market_research') {
        return `The user is looking for: "${data}".
        Provide 5 specific, optimized search keywords or phrases they should use to find the best results.
        Also provide a 1-sentence strategic advice on who to target.
        
        Format:
        Strategy: [1 sentence advice]
        Keywords: [keyword1], [keyword2], [keyword3], [keyword4], [keyword5]`;
    }
    if (type === 'reply') {
        const c = data as Contact;
        return `Write a professional email reply to this customer inquiry:
        Customer: ${c.name} (${c.email})
        Subject: ${c.subject}
        Message: ${c.message}`;
    }
    if (type === 'summary') {
        const c = data as Contact;
        return `Analyze this inquiry: ${c.subject} - ${c.message}`;
    }
    return custom || '';
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'careers' | 'market-intel' | 'chatbot'>('overview');
  
  // Email Composer States
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [emailContact, setEmailContact] = useState<Contact | null>(null);

  // Apollo State
  const [apolloQuery, setApolloQuery] = useState('');
  const [apolloTab, setApolloTab] = useState<'people' | 'companies' | 'users'>('people');
  const [apolloPeople, setApolloPeople] = useState<ApolloPerson[]>([]);
  const [apolloCompanies, setApolloCompanies] = useState<ApolloCompany[]>([]);
  const [apolloUsers, setApolloUsers] = useState<ApolloUser[]>([]);
  const [isApolloLoading, setIsApolloLoading] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [showAiPanel, setShowAiPanel] = useState(false);



  const fetchData = async () => {
    try {
      const [contactsRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/api/contacts`),
        axios.get(`${API_URL}/api/contacts/stats`)
      ]);
      setContacts(contactsRes.data);
      setStats(statsRes.data);
      
      // Load Applications from LocalStorage
      const savedApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      setApplications(savedApps);

    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Apollo Search Functions
  const handleApolloSearch = async (overrideQuery?: string) => {
    const queryToUse = overrideQuery || apolloQuery;
    if (!queryToUse && apolloTab !== 'users') return;

    setIsApolloLoading(true);
    try {
      if (apolloTab === 'people') {
        const results = await searchApollo(queryToUse);
        setApolloPeople(results);
      } else if (apolloTab === 'companies') {
        const results = await searchCompanies(queryToUse);
        setApolloCompanies(results);
      } else if (apolloTab === 'users') {
        const results = await getApolloUsers();
        setApolloUsers(results);
      }
    } catch (error) {
      console.error('Apollo search error:', error);
    } finally {
      setIsApolloLoading(false);
    }
  };

  const handleAiSuggestions = async () => {
    if (!apolloQuery) return;
    setAiGenerating(true);
    try {
      const response = await generateAIResponse(apolloQuery, 'market_research');
      setAiInsights(response);
    } catch (error) {
      console.error('AI suggestions error:', error);
    } finally {
      setAiGenerating(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'market-intel' && apolloTab === 'users' && apolloUsers.length === 0) {
      handleApolloSearch();
    }
  }, [activeTab, apolloTab]);

  // Open Email Composer with Contact
  const openEmailComposer = (contact: Contact) => {
    setEmailContact(contact);
    setEmailSubject(`Re: ${contact.subject}`);
    setEmailBody('');
    setAiInsights(null);
    setShowEmailComposer(true);
    setSelectedContact(null);
  };

  // Generate AI Email Reply
  const generateAIReply = async () => {
    if (!emailContact) return;
    setAiGenerating(true);
    try {
      const reply = await generateAIResponse(emailContact, 'reply');
      setEmailBody(reply);
    } catch (error) {
      alert('Failed to generate grow+ AI response. Please check your API configuration.');
    } finally {
      setAiGenerating(false);
    }
  };

  // Get AI Insights for Contact
  const getAIInsights = async () => {
    if (!emailContact) return;
    setAiGenerating(true);
    setShowAiPanel(true);
    try {
      const insights = await generateAIResponse(emailContact, 'summary');
      setAiInsights(insights);
    } catch (error) {
      setAiInsights('Failed to generate insights. Please check your API configuration.');
    } finally {
      setAiGenerating(false);
    }
  };

  // Send Email (opens default mail client)
  const sendEmail = () => {
    if (!emailContact) return;
    const mailtoLink = `mailto:${emailContact.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || contact.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const todayCount = contacts.filter(c => 
    new Date(c.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const weekCount = contacts.filter(c => {
    const contactDate = new Date(c.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return contactDate >= weekAgo;
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#c9f31c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col z-50">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold">
            grow<span className="text-[#c9f31c]">+</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              activeTab === 'overview' 
                ? 'bg-[#c9f31c] text-black font-semibold' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Overview
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              activeTab === 'contacts' 
                ? 'bg-[#c9f31c] text-black font-semibold' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contacts
            {contacts.length > 0 && (
              <span className="ml-auto bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-full">
                {contacts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('careers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              activeTab === 'careers'
                ? 'bg-[#c9f31c] text-black font-semibold'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Careers
            {applications.length > 0 && (
              <span className="ml-auto bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-full">
                {applications.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('market-intel')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              activeTab === 'market-intel'
                ? 'bg-[#c9f31c] text-black font-semibold'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Market Intel
          </button>

          <button
            onClick={() => setActiveTab('chatbot')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              activeTab === 'chatbot'
                ? 'bg-[#c9f31c] text-black font-semibold'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Grow+
          </button>


        </nav>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-6 border-t border-white/10">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Site
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 bg-black/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
              <p className="text-white/40 text-sm">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={fetchData}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Refresh"
              >
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-[#c9f31c]/20 flex items-center justify-center">
                <span className="text-[#c9f31c] font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <>
              {/* Overview Header & Actions */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print Report</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#c9f31c]/20 to-[#c9f31c]/5 border border-[#c9f31c]/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#c9f31c]/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#c9f31c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[#c9f31c] text-sm font-medium">Total</span>
                  </div>
                  <p className="text-4xl font-bold text-white mb-1">{stats?.totalContacts || 0}</p>
                  <p className="text-white/50 text-sm">Total Inquiries</p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Live
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-white mb-1">{todayCount}</p>
                  <p className="text-white/50 text-sm">Today's Inquiries</p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-white mb-1">{weekCount}</p>
                  <p className="text-white/50 text-sm">This Week</p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-white mb-1">{stats?.regionStats?.length || 0}</p>
                  <p className="text-white/50 text-sm">Regions</p>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Type Distribution */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-6">Inquiries by Type</h3>
                  <div className="space-y-4">
                    {stats?.typeStats?.map((type, index) => {
                      const total = stats.totalContacts || 1;
                      const percentage = Math.round((type.count / total) * 100);
                      const colors = ['#c9f31c', '#3B82F6', '#8B5CF6', '#F59E0B'];
                      return (
                        <div key={type._id}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80">{type._id || 'Unknown'}</span>
                            <span className="text-white/60 text-sm">{type.count} ({percentage}%)</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: colors[index % colors.length]
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    {(!stats?.typeStats || stats.typeStats.length === 0) && (
                      <p className="text-white/40 text-center py-8">No data available</p>
                    )}
                  </div>
                </div>

                {/* Region Distribution */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-6">Inquiries by Region</h3>
                  <div className="space-y-4">
                    {stats?.regionStats?.slice(0, 5).map((region, index) => {
                      const total = stats.totalContacts || 1;
                      const percentage = Math.round((region.count / total) * 100);
                      return (
                        <div key={region._id}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80">{region._id || 'Unknown'}</span>
                            <span className="text-white/60 text-sm">{region.count} ({percentage}%)</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#c9f31c] to-[#a8cc17] rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    {(!stats?.regionStats || stats.regionStats.length === 0) && (
                      <p className="text-white/40 text-center py-8">No data available</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Contacts */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Recent Inquiries</h3>
                  <button 
                    onClick={() => setActiveTab('contacts')}
                    className="text-[#c9f31c] text-sm hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-white/5">
                  {contacts.slice(0, 5).map((contact) => (
                    <div 
                      key={contact._id}
                      className="p-4 hover:bg-white/[0.02] transition-colors flex items-center gap-4"
                    >
                      <div 
                        className="w-10 h-10 rounded-full bg-[#c9f31c]/20 flex items-center justify-center flex-shrink-0 cursor-pointer"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <span className="text-[#c9f31c] font-semibold">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedContact(contact)}>
                        <p className="font-medium text-white truncate">{contact.name}</p>
                        <p className="text-white/40 text-sm truncate">{contact.subject}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            contact.type === 'Business' ? 'bg-[#c9f31c]/20 text-[#c9f31c]' :
                            contact.type === 'Support' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {contact.type}
                          </span>
                          <p className="text-white/30 text-xs mt-1">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEmailComposer(contact);
                          }}
                          className="p-2 bg-[#c9f31c]/20 hover:bg-[#c9f31c] text-[#c9f31c] hover:text-black rounded-lg transition-all"
                          title="Send AI Mail"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div className="p-12 text-center">
                      <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-white/40">No inquiries yet</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'contacts' && (
            <>
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by name, email, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9f31c]/50 transition-all"
                  />
                </div>
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white focus:outline-none focus:border-[#c9f31c]/50 transition-all cursor-pointer min-w-[140px]"
                  >
                    <option value="all">All Types</option>
                    <option value="Business">Business</option>
                    <option value="General">General</option>
                    <option value="Support">Support</option>
                  </select>
                  <svg 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print / PDF</span>
                </button>
              </div>

              {/* Contacts List */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/[0.02]">
                      <tr className="text-white/40 text-xs uppercase tracking-wider">
                        <th className="text-left px-6 py-4 font-medium">Customer</th>
                        <th className="text-left px-6 py-4 font-medium">Email</th>
                        <th className="text-left px-6 py-4 font-medium">Subject</th>
                        <th className="text-left px-6 py-4 font-medium">Type</th>
                        <th className="text-left px-6 py-4 font-medium">Location</th>
                        <th className="text-left px-6 py-4 font-medium">Date</th>
                        <th className="text-left px-6 py-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-16 text-center">
                            <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p className="text-white/40 text-lg mb-1">No inquiries found</p>
                            <p className="text-white/30 text-sm">Try adjusting your search or filter</p>
                          </td>
                        </tr>
                      ) : (
                        filteredContacts.map((contact) => (
                          <tr 
                            key={contact._id} 
                            className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="px-6 py-4 cursor-pointer" onClick={() => setSelectedContact(contact)}>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#c9f31c]/20 flex items-center justify-center">
                                  <span className="text-[#c9f31c] font-semibold">
                                    {contact.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span className="font-medium">{contact.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-white/70">{contact.email}</td>
                            <td className="px-6 py-4 text-white/70 max-w-[200px] truncate">{contact.subject}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs px-3 py-1 rounded-full ${
                                contact.type === 'Business' ? 'bg-[#c9f31c]/20 text-[#c9f31c]' :
                                contact.type === 'Support' ? 'bg-red-500/20 text-red-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {contact.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-white/50 text-sm">
                              {contact.city}, {contact.region}
                            </td>
                            <td className="px-6 py-4 text-white/50 text-sm">
                              {new Date(contact.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEmailComposer(contact);
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#c9f31c] to-[#a8cc17] text-black rounded-lg text-xs font-semibold hover:shadow-lg hover:shadow-[#c9f31c]/20 transition-all"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                AI Mail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'careers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Applications ({applications.length})</h3>
                <button
                  onClick={() => {
                    const printContent = document.getElementById('applications-table')?.innerHTML;
                    const win = window.open('', '', 'height=700,width=1000');
                    if(win) {
                        win.document.write('<html><head><title>Job Applications</title>');
                        win.document.write('<style>body { font-family: sans-serif; padding: 20px; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; } h1 { margin-bottom: 20px; }</style>');
                        win.document.write('</head><body>');
                        win.document.write('<h1 style="font-size: 24px; font-weight: bold;">Job Applications Data</h1>');
                        win.document.write('<table>');
                        win.document.write(printContent || 'No Data');
                        win.document.write('</table>');
                        win.document.write('</body></html>');
                        win.document.close();
                        win.print();
                    }
                  }}
                  className="flex items-center gap-2 bg-[#c9f31c] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#b0d618] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                  Print / PDF
                </button>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse" id="applications-table">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-medium">Candidate</th>
                        <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-medium">Role</th>
                        <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-medium">University</th>
                        <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-medium">Skills</th>
                        <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-medium">Submitted</th>
                        <th className="p-4 text-xs uppercase tracking-wider text-white/40 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {applications.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-white/40">
                            No applications received yet.
                          </td>
                        </tr>
                      ) : (
                        applications.map((app) => (
                          <tr key={app.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div>
                                <p className="font-bold text-white">{app.name}</p>
                                <p className="text-sm text-white/60">{app.email}</p>
                                <p className="text-xs text-white/40">{app.phone}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                app.role === 'Internship' ? 'bg-blue-500/20 text-blue-400' :
                                app.role === 'Full-time' ? 'bg-green-500/20 text-green-400' :
                                'bg-purple-500/20 text-purple-400'
                              }`}>
                                {app.role}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-white/80">{app.university}</td>
                            <td className="p-4 text-sm text-white/60 max-w-xs truncate" title={app.skills}>
                              {app.skills}
                            </td>
                            <td className="p-4 text-sm text-white/60">
                              {new Date(app.submittedAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                {app.portfolio && (
                                  <a href={app.portfolio} target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-400" title="View Portfolio">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                  </a>
                                )}
                                <a href={`mailto:${app.email}`} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-[#c9f31c]" title="Email Candidate">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'market-intel' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Market Intelligence</h3>
                <p className="text-white/60">Search leads and company data using Apollo.io</p>
              </div>

              {/* Search Interface */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={apolloQuery}
                      onChange={(e) => setApolloQuery(e.target.value)}
                      placeholder="Search for people, companies, or keywords..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9f31c]/50 transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && handleApolloSearch()}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleApolloSearch}
                      disabled={isApolloLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-[#c9f31c] text-black rounded-xl font-semibold hover:bg-[#b0d618] transition-all disabled:opacity-50"
                    >
                      {isApolloLoading ? (
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      )}
                      Search
                    </button>
                    <button
                      onClick={() => handleAiSuggestions()}
                      disabled={aiGenerating || !apolloQuery}
                      className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                      {aiGenerating ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      AI Tips
                    </button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1">
                  <button
                    onClick={() => setApolloTab('people')}
                    className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      apolloTab === 'people' ? 'bg-[#c9f31c] text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    People
                  </button>
                  <button
                    onClick={() => setApolloTab('companies')}
                    className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      apolloTab === 'companies' ? 'bg-[#c9f31c] text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Companies
                  </button>
                  <button
                    onClick={() => setApolloTab('users')}
                    className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      apolloTab === 'users' ? 'bg-[#c9f31c] text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Team
                  </button>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  {apolloTab === 'people' && apolloPeople.map((person) => (
                    <div key={person.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#c9f31c]/20 flex items-center justify-center flex-shrink-0">
                          {person.photo_url ? (
                            <img src={person.photo_url} alt={person.name} className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <span className="text-[#c9f31c] font-bold text-lg">
                              {person.first_name?.charAt(0) || person.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white">{person.name}</h4>
                          <p className="text-white/60 text-sm">{person.title}</p>
                          {person.organization && (
                            <p className="text-white/40 text-sm">{person.organization.name}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            {person.email && (
                              <a href={`mailto:${person.email}`} className="text-[#c9f31c] text-sm hover:underline">
                                {person.email}
                              </a>
                            )}
                            {person.linkedin_url && (
                              <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {apolloTab === 'companies' && apolloCompanies.map((company) => (
                    <div key={company.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#c9f31c]/20 flex items-center justify-center flex-shrink-0">
                          {company.logo_url ? (
                            <img src={company.logo_url} alt={company.name} className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <span className="text-[#c9f31c] font-bold text-lg">
                              {company.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white">{company.name}</h4>
                          <p className="text-white/60 text-sm">{company.short_description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            {company.website_url && (
                              <a href={company.website_url} target="_blank" rel="noopener noreferrer" className="text-[#c9f31c] text-sm hover:underline">
                                Website
                              </a>
                            )}
                            {company.linkedin_url && (
                              <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {apolloTab === 'users' && apolloUsers.map((user) => (
                    <div key={user.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#c9f31c]/20 flex items-center justify-center">
                          <span className="text-[#c9f31c] font-bold">
                            {user.first_name?.charAt(0) || user.email.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{user.first_name} {user.last_name}</p>
                          <p className="text-white/60 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {!isApolloLoading && (
                    <>
                      {apolloTab === 'people' && apolloPeople.length === 0 && apolloQuery && (
                        <p className="text-white/40 text-center py-8">No people found matching your search.</p>
                      )}
                      {apolloTab === 'companies' && apolloCompanies.length === 0 && apolloQuery && (
                        <p className="text-white/40 text-center py-8">No companies found matching your search.</p>
                      )}
                      {apolloTab === 'users' && apolloUsers.length === 0 && (
                        <p className="text-white/40 text-center py-8">No team members found.</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chatbot' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Grow+ AI Assistant</h3>
                <p className="text-white/60">Your intelligent assistant for emails, business ideas, marketing strategies, and more.</p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                <Chatbot context="admin" isOpen={true} onClose={() => {}} />
              </div>
            </div>
          )}


        </div>
      </main>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div 
            className="bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#c9f31c]/20 flex items-center justify-center">
                  <span className="text-[#c9f31c] font-bold text-xl">
                    {selectedContact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedContact.name}</h3>
                  <p className="text-white/50 text-sm">{selectedContact.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedContact(null)}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-1">Type</p>
                  <p className="font-medium">{selectedContact.type}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-1">Location</p>
                  <p className="font-medium">{selectedContact.city}, {selectedContact.region}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 col-span-2">
                  <p className="text-white/40 text-xs mb-1">Submitted</p>
                  <p className="font-medium">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Subject */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Subject</p>
                <p className="bg-white/5 rounded-xl p-4">{selectedContact.subject}</p>
              </div>

              {/* Message */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Message</p>
                <div className="bg-white/5 rounded-xl p-4 whitespace-pre-wrap text-white/80">
                  {selectedContact.message}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => openEmailComposer(selectedContact)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#c9f31c] to-[#a8cc17] text-black rounded-xl font-semibold hover:shadow-lg hover:shadow-[#c9f31c]/20 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  AI-Powered Reply
                </button>
                <a 
                  href={`mailto:${selectedContact.email}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Quick Mail
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Email Composer Modal */}
      {showEmailComposer && emailContact && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setShowEmailComposer(false)}
        >
          <div 
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex"
            onClick={e => e.stopPropagation()}
          >
            {/* Left Panel - Email Composer */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9f31c] to-[#a8cc17] flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">grow<span className="text-[#c9f31c]">+</span> AI Composer</h3>
                    <p className="text-white/50 text-sm">Powered by grow+ AI</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEmailComposer(false)}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Recipient Info */}
              <div className="p-4 bg-white/[0.02] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#c9f31c]/20 flex items-center justify-center">
                    <span className="text-[#c9f31c] font-bold text-lg">
                      {emailContact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{emailContact.name}</p>
                    <p className="text-white/50 text-sm">{emailContact.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      emailContact.type === 'Business' ? 'bg-[#c9f31c]/20 text-[#c9f31c]' :
                      emailContact.type === 'Support' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {emailContact.type}
                    </span>
                    <p className="text-white/40 text-xs mt-1">{emailContact.city}, {emailContact.region}</p>
                  </div>
                </div>
              </div>

              {/* Email Form */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {/* Subject */}
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9f31c]/50 transition-all"
                    placeholder="Email subject..."
                  />
                </div>

                {/* AI Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={generateAIReply}
                    disabled={aiGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {aiGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        grow+ thinking...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        grow+ AI Reply
                      </>
                    )}
                  </button>
                  <button
                    onClick={getAIInsights}
                    disabled={aiGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-all disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    grow+ Insights
                  </button>
                </div>

                {/* Message Body */}
                <div className="flex-1">
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full h-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c9f31c]/50 transition-all resize-none"
                    placeholder="Write your message here or click 'Generate AI Reply' to auto-generate..."
                  />
                </div>

                {/* Original Message Reference */}
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Original Inquiry</p>
                  <p className="text-white/60 text-sm font-medium mb-1">{emailContact.subject}</p>
                  <p className="text-white/40 text-sm line-clamp-3">{emailContact.message}</p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setShowEmailComposer(false)}
                  className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(emailBody);
                      alert('Email copied to clipboard!');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </button>
                  <button
                    onClick={sendEmail}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#c9f31c] to-[#a8cc17] text-black rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[#c9f31c]/20 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Email
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - AI Insights */}
            {showAiPanel && (
              <div className="w-80 border-l border-white/10 bg-white/[0.02] flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h4 className="font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#c9f31c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    grow+ Insights
                  </h4>
                  <button 
                    onClick={() => setShowAiPanel(false)}
                    className="text-white/40 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  {aiGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-8 h-8 border-2 border-[#c9f31c] border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p className="text-white/60 text-sm">grow+ AI analyzing...</p>
                    </div>
                  ) : aiInsights ? (
                    <div className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">
                      {aiInsights}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-white/40">
                      <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p className="text-sm">Click "grow+ Insights" to analyze this inquiry</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
