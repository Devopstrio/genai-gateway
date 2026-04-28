import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { ShieldCheck, Activity, Database, TrendingUp, RefreshCcw, ExternalLink, Zap, Globe, AlertTriangle, Layers, Binary, Cpu, Wallet, ShieldAlert, Bot, MessageSquareCode } from 'lucide-react';

const tokenUsageTrend = [
  { name: 'Mon', tokens: 1.2 },
  { name: 'Tue', tokens: 1.8 },
  { name: 'Wed', tokens: 2.1 },
  { name: 'Thu', tokens: 1.9 },
  { name: 'Fri', tokens: 2.5 },
  { name: 'Sat', tokens: 1.4 },
  { name: 'Sun', tokens: 1.1 },
];

const modelDistribution = [
  { name: 'GPT-4o', value: 45, color: '#6366f1' },
  { name: 'Claude 3', value: 25, color: '#8b5cf6' },
  { name: 'Llama 3 (vLLM)', value: 20, color: '#f43f5e' },
  { name: 'Gemini 1.5', value: 10, color: '#10b981' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">AI Gateway Dashboard</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl font-medium">Institutional LLM brokerage, token economics, and responsible AI guardrails.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2">
             <RefreshCcw size={18} /> Refresh Health
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-indigo-900/40 flex items-center gap-2">
             <Zap size={18} /> Deploy New Router
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Tokens" value="12.5M" change="+12%" icon={<Cpu className="text-indigo-400" />} />
        <StatCard title="Avg Latency" value="450ms" change="-15ms" icon={<Activity className="text-emerald-400" />} />
        <StatCard title="Active Tenants" value="45" change="Stable" icon={<Bot className="text-rose-400" />} />
        <StatCard title="Cache Hit Rate" value="32%" change="+5%" icon={<RefreshCcw className="text-blue-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Token Usage Trend */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Institutional Token Velocity (Millions)
            </h2>
            <div className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-800/50">Usage Tracking</div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenUsageTrend}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="tokens" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorTokens)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Distribution */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Model Portfolio Distribution
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold italic">
               <ShieldCheck size={20} />
               Governed Models
            </div>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {modelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical AI Guardrails */}
      <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3 text-rose-400 uppercase tracking-widest">
           <ShieldAlert size={28} />
           Active Prompt Guardrail Violations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <ProjectCard name="PII-Leak-Detection" status="Blocked" score="Risk: High" type="Security Policy" icon={<ShieldAlert size={20} />} />
           <ProjectCard name="Prompt-Injection-Attack" status="Identified" score="Pattern: 42" type="Threat Intel" icon={<AlertTriangle size={20} />} />
           <ProjectCard name="Unauthorized-Model-Access" status="Blocked" score="Tenant: 10" type="Access Control" icon={<Lock size={20} />} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-1000 rotate-12">
       {React.cloneElement(icon, { size: 160 })}
    </div>
    <div className="relative z-10">
      <div className="p-4 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800/50 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('+') || change.startsWith('-') || change === 'Blocked' || change === 'Stable' ? (change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ name, status, score, type, icon }: any) => (
  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl hover:bg-slate-800/50 transition cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-indigo-400 transition">{icon}</div>
        <h3 className="text-xl font-bold text-slate-100">{name}</h3>
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full border border-slate-700 uppercase tracking-tighter ${status === 'Blocked' ? 'bg-rose-950/20 text-rose-400 border-rose-800/50' : 'bg-indigo-950/20 text-indigo-400 border-indigo-800/50'}`}>{status}</span>
    </div>
    <div className="flex justify-between items-center mt-8">
       <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Signal: {score} | {type}</span>
       <ExternalLink size={14} className="text-slate-700 group-hover:text-white transition" />
    </div>
  </div>
);

const Lock = ({ size, className }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
)

export default Dashboard;
