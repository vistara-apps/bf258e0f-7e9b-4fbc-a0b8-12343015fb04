'use client';

import { Post } from '@/lib/types';
import { ProfilePic } from './ProfilePic';
import { EngagementButton } from './EngagementButton';
import { Lock, Clock } from 'lucide-react';
import { MOCK_CREATORS } from '@/lib/constants';

interface ContentCardProps {
  post: Post;
  variant?: 'premiumPost' | 'paywall';
  onUnlock?: () => void;
  onEngagement?: (type: 'like' | 'comment' | 'share') => void;
}

export function ContentCard({ post, variant = 'premiumPost', onUnlock, onEngagement }: ContentCardProps) {
  const creator = MOCK_CREATORS.find(c => c.creatorId === post.creatorId);
  const isPaywalled = variant === 'paywall' && post.isPremium;

  return (
    <div className="content-card animate-fade-in">
      {/* Creator Info */}
      <div className="flex items-center gap-3 mb-4">
        <ProfilePic 
          src={creator?.avatarUrl || '/api/placeholder/40/40'} 
          alt={creator?.fName || 'Creator'}
          variant="small"
        />
        <div className="flex-1">
          <h4 className="font-medium text-white">{creator?.fName}</h4>
          <div className="flex items-center gap-2 text-sm text-white text-opacity-70">
            <Clock className="w-3 h-3" />
            <span>{new Date(post.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
        {post.isPremium && (
          <div className="flex items-center gap-1 bg-accent bg-opacity-20 px-2 py-1 rounded-full">
            <Lock className="w-3 h-3 text-accent" />
            <span className="text-xs text-accent font-medium">Premium</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        {isPaywalled ? (
          <div className="text-center py-8">
            <Lock className="w-12 h-12 text-white text-opacity-50 mx-auto mb-4" />
            <p className="text-white text-opacity-80 mb-4">
              This premium content is locked
            </p>
            <button 
              className="btn-primary"
              onClick={onUnlock}
            >
              Unlock for ${post.price}
            </button>
          </div>
        ) : (
          <p className="text-white text-opacity-90 leading-relaxed">
            {post.content}
          </p>
        )}
      </div>

      {/* Engagement */}
      {!isPaywalled && (
        <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-20">
          <div className="flex items-center gap-4">
            <EngagementButton 
              type="like" 
              count={post.likes}
              variant="like"
              onClick={() => onEngagement?.('like')}
              rewardTokens={1}
            />
            <EngagementButton 
              type="comment" 
              count={post.comments}
              variant="comment"
              onClick={() => onEngagement?.('comment')}
              rewardTokens={3}
            />
            <EngagementButton 
              type="share" 
              count={post.shares}
              variant="share"
              onClick={() => onEngagement?.('share')}
              rewardTokens={5}
            />
          </div>
          
          {post.isPremium && (
            <div className="text-sm text-accent font-medium">
              +5 tokens earned
            </div>
          )}
        </div>
      )}
    </div>
  );
}
