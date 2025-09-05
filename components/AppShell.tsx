'use client';

import { ReactNode } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { Menu, Bell, Search } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      {/* Header */}
      <header className="glass-card mx-4 mt-4 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-white" />
            <div>
              <h1 className="text-xl font-bold text-white">SocialFi Connect</h1>
              <p className="text-sm text-white text-opacity-80">Empower Creators. Reward Fans.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-white opacity-80 hover:opacity-100 cursor-pointer transition-opacity duration-200" />
            <Bell className="w-5 h-5 text-white opacity-80 hover:opacity-100 cursor-pointer transition-opacity duration-200" />
            <Wallet>
              <ConnectWallet>
                <Name className="text-white" />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 pb-8">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card mx-4 mb-4 p-4">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 transition-opacity duration-200">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-md"></div>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 transition-opacity duration-200">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-md"></div>
            <span className="text-xs">Creators</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 transition-opacity duration-200">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-md"></div>
            <span className="text-xs">Rewards</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 transition-opacity duration-200">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-md"></div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
