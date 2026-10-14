import React from 'react';
import MarketOverview from './components/MarketOverview';
import { Terminal, Cpu } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-cyber-dark text-slate-200 font-mono flex flex-col">
      <header className="border-b border-cyber-border bg-cyber-panel/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyber-accent/10 border border-cyber-accent/40 rounded">
              <Cpu className="w-6 h-6 text-cyber-accent" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest uppercase text-white">
                Echoes of Code
              </h1>
              <span className="text-xs text-cyber-green block tracking-tight">
                Sim & Strategic Cyber Corporate Warfare v0.1
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500 hidden sm:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
            NODE: ONLINE
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <MarketOverview />
      </main>

      <footer className="border-t border-cyber-border py-4 text-center text-xs text-gray-600">
        Echoes of Code &copy; {new Date().getFullYear()} — Built with React, Zustand & Tailwind CSS.
      </footer>
    </div>
  );
}
