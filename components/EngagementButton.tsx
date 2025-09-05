'use client';

import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface EngagementButtonProps {
  type: 'like' | 'comment' | 'share';
  count: number;
  variant?: 'like' | 'comment' | 'share';
  onClick?: () => void;
}

export function EngagementButton({ type, count, variant, onClick }: EngagementButtonProps) {
  const icons = {
    like: Heart,
    comment: MessageCircle,
    share: Share2,
  };

  const Icon = icons[type];

  return (
    <button 
      className="engagement-button"
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span>{count}</span>
    </button>
  );
}
