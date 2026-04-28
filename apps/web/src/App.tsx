import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShieldCheck, Activity, Database, Users, TrendingUp, BarChart4, Settings, LayoutDashboard, Globe, Zap, Box, Anchor, Share2, Server, Repeat, AlertTriangle, Layers, Wallet, ShieldAlert, Cpu, Bot, Terminal, LineChart, FileCode, Search, MessageSquareCode } from 'lucide-react';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
        {/* Navigation Sidebar */}
        <aside className="w-72 bg-slate-900/40 backdrop-blur-3xl border-r border-slate-800 flex flex-col p-8 fixed h-full shadow-2xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl shadow-indigo-900/20 text-white">
               <Cpu size={28} />
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">GAG Hub</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="AI Dashboard" active />
            <NavItem to="/providers" icon={<Globe size={20} />} label="Model Providers" />
            <NavItem to="/governance" icon={<ShieldCheck size={20} />} label="Prompt Guardrails" />
            <NavItem to="/usage" icon={<LineChart size={20} />} label="Token Economics" />
            <NavItem to="/rag" icon={<Database size={20} />} label="RAG Knowledge" />
            <NavItem to="/playground" icon={<Terminal size={20} />} label="Model Playground" />
            <NavItem to="/tenants" icon={<Users size={20} />} label="Tenant Governance" />
            <NavItem to="/logs" icon={<MessageSquareCode size={20} />} label="Prompt Traces" />
          </nav>

          <div className="pt-6 border-t border-slate-800">
            <NavItem to="/settings" icon={<Settings size={20} />} label="Gateway Settings" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72">
          <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-widest">
              <span>Enterprise GenAI Orchestration</span>
              <span>/</span>
              <span className="text-white font-bold">GenAI Gateway</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-white">AI Platform Architect</p>
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-black">Admin Access</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-slate-300">AA</div>
            </div>
          </header>

          <div className="p-10 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

const NavItem = ({ to, icon, label, active }: any) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 shadow-lg shadow-indigo-950/50' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <span className={`${active ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition transform group-hover:scale-110'}`}>{icon}</span>
    <span className="font-bold text-sm tracking-tight">{label}</span>
  </Link>
);

export default App;
