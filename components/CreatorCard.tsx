'use client';

import { Creator } from '@/lib/types';
import { ProfilePic } from './ProfilePic';
import { Users, DollarSign } from 'lucide-react';

interface CreatorCardProps {
  creator: Creator;
  variant?: 'default';
  onClick?: () => void;
}

export function CreatorCard({ creator, variant = 'default', onClick }: CreatorCardProps) {
  return (
    <div className="creator-card animate-fade-in" onClick={onClick}>
      <div className="flex items-start gap-4">
        <ProfilePic 
          src={creator.avatarUrl} 
          alt={creator.fName}
          variant="large"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            {creator.fName}
          </h3>
          <p className="text-sm text-white text-opacity-80 line-clamp-2 mb-3">
            {creator.bio}
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-white text-opacity-70">
              <Users className="w-4 h-4" />
              <span>{creator.followerCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-white text-opacity-70">
              <DollarSign className="w-4 h-4" />
              <span>${creator.totalEarnings.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button className="btn-primary flex-1 text-sm py-2">
          Subscribe
        </button>
        <button className="btn-secondary text-sm py-2 px-4">
          View Profile
        </button>
      </div>
    </div>
  );
}
