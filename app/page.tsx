'use client';

import { useEffect, useState } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useAccount } from 'wagmi';
import { AppShell } from '@/components/AppShell';
import { CreatorCard } from '@/components/CreatorCard';
import { ContentCard } from '@/components/ContentCard';
import { SubscriptionTier } from '@/components/SubscriptionTier';
import { MetricsCard } from '@/components/MetricsCard';
import { CreatorDashboard } from '@/components/CreatorDashboard';
import { RewardsDashboard } from '@/components/RewardsDashboard';
import { ToastContainer } from '@/components/ui/Toast';
import { Loading } from '@/components/ui/Loading';
import { useAppStore, useIsAuthenticated, useCurrentUser } from '@/lib/store';
import { api } from '@/lib/api';
import { generateId } from '@/lib/utils';
import { MOCK_SUBSCRIPTION_TIERS } from '@/lib/constants';
import { TrendingUp, Users, DollarSign, Star } from 'lucide-react';

type ViewType = 'home' | 'creators' | 'rewards' | 'profile' | 'creator-dashboard';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const { address, isConnected } = useAccount();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>>([]);

  const {
    setCurrentUser,
    setAuthenticated,
    setCreators,
    setPosts,
    creators,
    posts,
    addEngagement,
    addSubscription,
    setError,
    clearError
  } = useAppStore();

  const isAuthenticated = useIsAuthenticated();
  const currentUser = useCurrentUser();

  useEffect(() => {
    setFrameReady();
    initializeApp();
  }, [setFrameReady]);

  useEffect(() => {
    if (isConnected && address && !isAuthenticated) {
      authenticateUser();
    }
  }, [isConnected, address, isAuthenticated]);

  const initializeApp = async () => {
    setIsLoading(true);
    try {
      const [creatorsData, postsData] = await Promise.all([
        api.getCreators(),
        api.getPosts()
      ]);
      
      setCreators(creatorsData);
      setPosts(postsData);
    } catch (error) {
      console.error('Failed to initialize app:', error);
      addToast('error', 'Failed to load data', 'Please try refreshing the page');
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateUser = async () => {
    if (!address) return;

    try {
      const user = await api.authenticateUser(address);
      setCurrentUser(user);
      setAuthenticated(true);
      addToast('success', 'Welcome!', 'You are now connected to SocialFi Connect');
    } catch (error) {
      console.error('Authentication failed:', error);
      addToast('error', 'Authentication failed', 'Please try connecting your wallet again');
    }
  };

  const addToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
    const toast = {
      id: generateId(),
      type,
      title,
      message,
      duration: 5000,
    };
    setToasts(prev => [...prev, toast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleSubscribe = async (tierId: string) => {
    if (!isAuthenticated || !currentUser) {
      addToast('warning', 'Connect Wallet', 'Please connect your wallet to subscribe');
      return;
    }

    const tier = MOCK_SUBSCRIPTION_TIERS.find(t => t.id === tierId);
    if (!tier) return;

    try {
      addToast('info', 'Processing...', 'Confirming your subscription on Base');
      
      const subscription = await api.subscribe(
        '1', // Default to first creator for demo
        tier.name,
        tier.price,
        currentUser.baseAddress
      );
      
      addSubscription(subscription);
      addToast('success', 'Subscribed!', `You are now subscribed to ${tier.name}`);
    } catch (error) {
      console.error('Subscription failed:', error);
      addToast('error', 'Subscription failed', 'Please try again');
    }
  };

  const handleUnlockContent = async (postId: string, price: number) => {
    if (!isAuthenticated || !currentUser) {
      addToast('warning', 'Connect Wallet', 'Please connect your wallet to unlock content');
      return;
    }

    try {
      addToast('info', 'Processing...', 'Unlocking content on Base');
      
      const success = await api.purchaseContent(postId, price, currentUser.baseAddress);
      
      if (success) {
        addToast('success', 'Content Unlocked!', 'You now have access to this premium content');
      }
    } catch (error) {
      console.error('Content unlock failed:', error);
      addToast('error', 'Unlock failed', 'Please try again');
    }
  };

  const handleEngagement = async (type: 'like' | 'comment' | 'share', postId: string) => {
    if (!isAuthenticated || !currentUser) {
      addToast('warning', 'Connect Wallet', 'Please connect your wallet to engage');
      return;
    }

    try {
      const result = await api.recordEngagement(type, postId, currentUser.fanId);
      
      if (result.success) {
        const action = {
          type,
          postId,
          userId: currentUser.fanId,
          timestamp: new Date().toISOString(),
          rewardTokens: result.rewardTokens,
        };
        
        addEngagement(action);
        addToast('success', 'Tokens Earned!', `+${result.rewardTokens} reward tokens`);
      }
    } catch (error) {
      console.error('Engagement failed:', error);
      addToast('error', 'Action failed', 'Please try again');
    }
  };

  if (isLoading) {
    return (
      <AppShell currentView={currentView} onViewChange={setCurrentView}>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loading size="lg" text="Loading SocialFi Connect..." />
        </div>
      </AppShell>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'creators':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Discover Creators</h1>
              <p className="text-white text-opacity-80">
                Find and support amazing creators on Base
              </p>
            </div>
            <div className="space-y-4">
              {creators.map((creator) => (
                <CreatorCard
                  key={creator.creatorId}
                  creator={creator}
                  onClick={() => console.log('View creator:', creator.creatorId)}
                />
              ))}
            </div>
          </div>
        );

      case 'rewards':
        return <RewardsDashboard />;

      case 'creator-dashboard':
        return <CreatorDashboard creatorId={currentUser?.fanId || '1'} />;

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Your Profile</h1>
              <p className="text-white text-opacity-80">
                Manage your account and preferences
              </p>
            </div>
            {isAuthenticated && currentUser ? (
              <div className="glass-card p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{currentUser.fName}</h3>
                  <p className="text-white text-opacity-60 text-sm mb-4">
                    {currentUser.baseAddress.slice(0, 6)}...{currentUser.baseAddress.slice(-4)}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-accent">{currentUser.rewardTokens}</p>
                      <p className="text-white text-opacity-60 text-sm">Reward Tokens</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent">0</p>
                      <p className="text-white text-opacity-60 text-sm">Subscriptions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView('creator-dashboard')}
                    className="btn-primary mt-6"
                  >
                    Creator Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 text-center">
                <p className="text-white text-opacity-80 mb-4">
                  Connect your wallet to view your profile
                </p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <section className="text-center py-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                Welcome to SocialFi Connect
              </h1>
              <p className="text-lg text-white text-opacity-80 mb-6">
                Empower Creators. Reward Fans. Build Communities on Base.
              </p>
              
              {/* Metrics Overview */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <MetricsCard
                  title="Active Creators"
                  value="2.5K"
                  subtitle="+12% this week"
                  icon={<Users className="w-5 h-5" />}
                  trend="up"
                />
                <MetricsCard
                  title="Total Rewards"
                  value="$125K"
                  subtitle="+8% this week"
                  icon={<DollarSign className="w-5 h-5" />}
                  trend="up"
                />
              </div>
            </section>

            {/* Featured Creators */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">Featured Creators</h2>
                <button 
                  onClick={() => setCurrentView('creators')}
                  className="text-accent hover:text-opacity-80 transition-colors duration-200"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {creators.slice(0, 2).map((creator) => (
                  <CreatorCard
                    key={creator.creatorId}
                    creator={creator}
                    onClick={() => console.log('View creator:', creator.creatorId)}
                  />
                ))}
              </div>
            </section>

            {/* Subscription Tiers */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">Subscription Plans</h2>
                <Star className="w-6 h-6 text-accent" />
              </div>
              
              <div className="space-y-4">
                {MOCK_SUBSCRIPTION_TIERS.map((tier) => (
                  <SubscriptionTier
                    key={tier.id}
                    tier={tier}
                    variant={tier.isPopular ? 'premium' : 'default'}
                    onSubscribe={() => handleSubscribe(tier.id)}
                  />
                ))}
              </div>
            </section>

            {/* Latest Content */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">Latest Content</h2>
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              
              <div className="space-y-4">
                {posts.map((post) => (
                  <ContentCard
                    key={post.postId}
                    post={post}
                    variant={post.isPremium ? 'paywall' : 'premiumPost'}
                    onUnlock={() => handleUnlockContent(post.postId, post.price || 0)}
                    onEngagement={(type) => handleEngagement(type, post.postId)}
                  />
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Ready to Start Creating?
                </h3>
                <p className="text-white text-opacity-80 mb-6">
                  Join thousands of creators building their communities on Base
                </p>
                <button 
                  onClick={() => setCurrentView('creator-dashboard')}
                  className="btn-primary"
                >
                  Become a Creator
                </button>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <>
      <AppShell currentView={currentView} onViewChange={setCurrentView}>
        {renderCurrentView()}
      </AppShell>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}
