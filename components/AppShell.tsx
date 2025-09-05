'use client';

import { ReactNode } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { Menu, Bell, Search, Home, Users, Gift, User } from 'lucide-react';

type ViewType = 'home' | 'creators' | 'rewards' | 'profile' | 'creator-dashboard';

interface AppShellProps {
  children: ReactNode;
  currentView?: ViewType;
  onViewChange?: (view: ViewType) => void;
}

export function AppShell({ children, currentView = 'home', onViewChange }: AppShellProps) {
  const navigationItems = [
    { id: 'home' as ViewType, icon: Home, label: 'Home' },
    { id: 'creators' as ViewType, icon: Users, label: 'Creators' },
    { id: 'rewards' as ViewType, icon: Gift, label: 'Rewards' },
    { id: 'profile' as ViewType, icon: User, label: 'Profile' },
  ];

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
      <main className="max-w-xl mx-auto px-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card mx-4 mb-4 p-4">
        <div className="flex justify-around items-center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange?.(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                  isActive
                    ? 'text-accent'
                    : 'text-white opacity-80 hover:opacity-100'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-accent bg-opacity-20'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
