'use client';

import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface EngagementButtonProps {
  type: 'like' | 'comment' | 'share';
  count: number;
  variant?: 'like' | 'comment' | 'share';
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  rewardTokens?: number;
}

export function EngagementButton({ 
  type, 
  count, 
  variant,
  isActive = false, 
  onClick, 
  disabled = false,
  rewardTokens = 0
}: EngagementButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const icons = {
    like: Heart,
    comment: MessageCircle,
    share: Share2,
  };

  const Icon = icons[type];

  const handleClick = () => {
    if (disabled || !onClick) return;
    
    setIsAnimating(true);
    onClick();
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'text-accent bg-accent bg-opacity-10'
          : 'text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <motion.div
        animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-4 h-4" fill={isActive ? 'currentColor' : 'none'} />
      </motion.div>
      
      <span className="text-sm font-medium">{count}</span>
      
      {rewardTokens > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isAnimating ? { opacity: [0, 1, 0], y: [10, -20, -30] } : {}}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-accent font-bold"
        >
          +{rewardTokens} tokens
        </motion.div>
      )}
    </motion.button>
  );
}
