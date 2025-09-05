'use client';

import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { CreatorCard } from '@/components/CreatorCard';
import { ContentCard } from '@/components/ContentCard';
import { SubscriptionTier } from '@/components/SubscriptionTier';
import { MetricsCard } from '@/components/MetricsCard';
import { MOCK_CREATORS, MOCK_POSTS, MOCK_SUBSCRIPTION_TIERS } from '@/lib/constants';
import { TrendingUp, Users, DollarSign, Star } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleSubscribe = (tierId: string) => {
    console.log('Subscribing to tier:', tierId);
    // TODO: Implement Base transaction for subscription
  };

  const handleUnlockContent = (postId: string, price: number) => {
    console.log('Unlocking content:', postId, 'for $', price);
    // TODO: Implement Base transaction for content unlock
  };

  return (
    <AppShell>
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
            <button className="text-accent hover:text-opacity-80 transition-colors duration-200">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {MOCK_CREATORS.slice(0, 2).map((creator) => (
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
            {MOCK_POSTS.map((post) => (
              <ContentCard
                key={post.postId}
                post={post}
                variant={post.isPremium ? 'paywall' : 'premiumPost'}
                onUnlock={() => handleUnlockContent(post.postId, post.price || 0)}
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
            <button className="btn-primary">
              Become a Creator
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
