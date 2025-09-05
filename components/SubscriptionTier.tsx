'use client';

import { SubscriptionTier as SubscriptionTierType } from '@/lib/types';
import { Check, Star } from 'lucide-react';

interface SubscriptionTierProps {
  tier: SubscriptionTierType;
  variant?: 'default' | 'premium';
  onSubscribe?: () => void;
}

export function SubscriptionTier({ tier, variant = 'default', onSubscribe }: SubscriptionTierProps) {
  const isPremium = variant === 'premium' || tier.isPopular;

  return (
    <div className={`subscription-tier animate-slide-up ${isPremium ? 'border-accent border-opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
            {tier.isPopular && (
              <div className="flex items-center gap-1 bg-accent bg-opacity-20 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-accent" />
                <span className="text-xs text-accent font-medium">Popular</span>
              </div>
            )}
          </div>
          <p className="text-sm text-white text-opacity-80 mt-1">{tier.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">${tier.price}</div>
          <div className="text-sm text-white text-opacity-70">/month</div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {tier.perks.map((perk, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-sm text-white text-opacity-90">{perk}</span>
          </div>
        ))}
      </div>

      <button 
        className={isPremium ? 'btn-primary w-full' : 'btn-secondary w-full'}
        onClick={onSubscribe}
      >
        Subscribe Now
      </button>
    </div>
  );
}
