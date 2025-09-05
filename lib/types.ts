export interface Creator {
  creatorId: string;
  fName: string;
  bio: string;
  avatarUrl: string;
  baseAddress: string;
  followerCount: number;
  totalEarnings: number;
}

export interface Fan {
  fanId: string;
  fName: string;
  avatarUrl: string;
  baseAddress: string;
  rewardTokens: number;
}

export interface Subscription {
  subscriptionId: string;
  creatorId: string;
  fanId: string;
  tierName: string;
  price: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Post {
  postId: string;
  creatorId: string;
  content: string;
  contentType: 'text' | 'image' | 'video';
  isPremium: boolean;
  price?: number;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface RewardToken {
  tokenId: string;
  creatorId: string;
  fanId: string;
  balance: number;
  earnedToday: number;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  isPopular?: boolean;
}

export interface EngagementAction {
  type: 'like' | 'comment' | 'share';
  postId: string;
  userId: string;
  timestamp: string;
  rewardTokens: number;
}
