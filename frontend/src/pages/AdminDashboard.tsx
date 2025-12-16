import React, { useEffect, useState } from 'react';
import Navbar from '../components/ui/Navbar';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, Mail, MapPin, Globe, Activity } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';

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

const COLORS = ['#FCA311', '#00A878', '#BA1200', '#FFFFFF', '#8884d8'];

const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, statsRes] = await Promise.all([
          axios.get(`${API_URL}/api/contacts`),
          axios.get(`${API_URL}/api/contacts/stats`)
        ]);
        setContacts(contactsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Error fetching admin data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[var(--color-primary)] selection:text-black">
      <Navbar onAuthClick={() => {}} />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Admin <span className="text-[var(--color-primary)]">Dashboard</span></h1>
          <p className="text-white/60 text-lg">Overview of client inquiries and demographics.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            icon={<Mail className="w-6 h-6 text-[var(--color-primary)]" />} 
            label="Total Inquiries" 
            value={stats?.totalContacts || 0} 
          />
          <StatCard 
            icon={<Globe className="w-6 h-6 text-blue-400" />} 
            label="Regions Active" 
            value={stats?.regionStats.length || 0} 
          />
          <StatCard 
            icon={<MapPin className="w-6 h-6 text-green-400" />} 
            label="Cities Reached" 
            value={stats?.cityStats.length || 0} 
          />
          <StatCard 
            icon={<Activity className="w-6 h-6 text-red-400" />} 
            label="Conversion Rate" 
            value="2.4%" 
            subtext="Mock Data"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Client Types Pie Chart */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--color-primary)]" /> Client Types
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.typeStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="_id"
                  >
                    {stats?.typeStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Distribution Bar Chart */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" /> Regional Distribution
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.regionStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="_id" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#00A878" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Inquiries Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
          <h3 className="text-xl font-bold mb-6">Recent Inquiries</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-sm uppercase tracking-wider">
                  <th className="pb-4 font-medium">Name</th>
                  <th className="pb-4 font-medium">Email</th>
                  <th className="pb-4 font-medium">Subject</th>
                  <th className="pb-4 font-medium">Type</th>
                  <th className="pb-4 font-medium">Location</th>
                  <th className="pb-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="text-white/80 text-sm">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 font-medium text-white">{contact.name}</td>
                    <td className="py-4">{contact.email}</td>
                    <td className="py-4">{contact.subject}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        contact.type === 'Business' ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' :
                        contact.type === 'Support' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {contact.type}
                      </span>
                    </td>
                    <td className="py-4">{contact.city}, {contact.region}</td>
                    <td className="py-4 text-white/40">{new Date(contact.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/40">No inquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, subtext }: { icon: React.ReactNode, label: string, value: string | number, subtext?: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors group">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      {subtext && <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-md">{subtext}</span>}
    </div>
    <h4 className="text-white/50 text-sm font-medium mb-1">{label}</h4>
    <p className="text-3xl font-bold text-white font-display">{value}</p>
  </div>
);

export default AdminDashboard;
