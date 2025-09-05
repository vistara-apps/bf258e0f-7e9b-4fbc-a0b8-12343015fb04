import { parseEther, formatEther } from 'viem';
import { Creator, Fan, Post, Subscription, RewardToken } from './types';
import { generateId } from './utils';

// Mock API service for demonstration
// In production, these would connect to actual Base smart contracts and backend services

export class SocialFiAPI {
  private static instance: SocialFiAPI;
  
  static getInstance(): SocialFiAPI {
    if (!SocialFiAPI.instance) {
      SocialFiAPI.instance = new SocialFiAPI();
    }
    return SocialFiAPI.instance;
  }

  // Authentication
  async authenticateUser(address: string): Promise<Fan> {
    // Simulate API call
    await this.delay(1000);
    
    const user: Fan = {
      fanId: generateId(),
      fName: `User ${address.slice(-4)}`,
      avatarUrl: `/api/placeholder/64/64`,
      baseAddress: address,
      rewardTokens: Math.floor(Math.random() * 1000),
    };
    
    return user;
  }

  // Creator operations
  async getCreators(): Promise<Creator[]> {
    await this.delay(800);
    
    return [
      {
        creatorId: '1',
        fName: 'Alex Chen',
        bio: 'Web3 Developer & DeFi Educator. Building the future of finance.',
        avatarUrl: '/api/placeholder/64/64',
        baseAddress: '0x1234567890123456789012345678901234567890',
        followerCount: 12500,
        totalEarnings: 2450.75,
      },
      {
        creatorId: '2',
        fName: 'Sarah Kim',
        bio: 'NFT Artist & Community Builder. Creating digital experiences.',
        avatarUrl: '/api/placeholder/64/64',
        baseAddress: '0x2345678901234567890123456789012345678901',
        followerCount: 8900,
        totalEarnings: 1890.25,
      },
      {
        creatorId: '3',
        fName: 'Marcus Johnson',
        bio: 'Crypto Analyst & Trading Coach. Market insights daily.',
        avatarUrl: '/api/placeholder/64/64',
        baseAddress: '0x3456789012345678901234567890123456789012',
        followerCount: 15200,
        totalEarnings: 3200.50,
      },
    ];
  }

  async getCreatorById(creatorId: string): Promise<Creator | null> {
    const creators = await this.getCreators();
    return creators.find(c => c.creatorId === creatorId) || null;
  }

  // Post operations
  async getPosts(): Promise<Post[]> {
    await this.delay(600);
    
    return [
      {
        postId: '1',
        creatorId: '1',
        content: 'Deep dive into the latest DeFi protocols and yield farming strategies. This week we\'re analyzing Uniswap V4 and its potential impact on the ecosystem.',
        contentType: 'text',
        isPremium: true,
        price: 2,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        likes: 45,
        comments: 12,
        shares: 8,
      },
      {
        postId: '2',
        creatorId: '2',
        content: 'New NFT collection drop! Behind the scenes of my creative process and the story behind each piece. Limited edition available now.',
        contentType: 'image',
        isPremium: false,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        likes: 89,
        comments: 23,
        shares: 15,
      },
      {
        postId: '3',
        creatorId: '3',
        content: 'Market analysis: Why I think we\'re entering a new bull cycle. Technical analysis and on-chain metrics included with detailed charts.',
        contentType: 'text',
        isPremium: true,
        price: 3,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        likes: 67,
        comments: 34,
        shares: 22,
      },
    ];
  }

  async createPost(post: Omit<Post, 'postId' | 'timestamp' | 'likes' | 'comments' | 'shares'>): Promise<Post> {
    await this.delay(1200);
    
    const newPost: Post = {
      ...post,
      postId: generateId(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
    };
    
    return newPost;
  }

  // Subscription operations
  async subscribe(creatorId: string, tierName: string, price: number, userAddress: string): Promise<Subscription> {
    await this.delay(2000); // Simulate blockchain transaction time
    
    const subscription: Subscription = {
      subscriptionId: generateId(),
      creatorId,
      fanId: generateId(),
      tierName,
      price,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      isActive: true,
    };
    
    return subscription;
  }

  async unsubscribe(subscriptionId: string): Promise<boolean> {
    await this.delay(1500);
    return true;
  }

  // Content purchase
  async purchaseContent(postId: string, price: number, userAddress: string): Promise<boolean> {
    await this.delay(1800);
    
    // Simulate Base transaction
    console.log(`Processing payment of ${price} ETH for post ${postId} from ${userAddress}`);
    
    return true;
  }

  // Engagement rewards
  async recordEngagement(
    type: 'like' | 'comment' | 'share',
    postId: string,
    userId: string
  ): Promise<{ success: boolean; rewardTokens: number }> {
    await this.delay(500);
    
    const rewardAmounts = {
      like: 1,
      comment: 3,
      share: 5,
    };
    
    const rewardTokens = rewardAmounts[type];
    
    return {
      success: true,
      rewardTokens,
    };
  }

  // Reward tokens
  async getUserRewardTokens(userId: string): Promise<RewardToken[]> {
    await this.delay(400);
    
    return [
      {
        tokenId: generateId(),
        creatorId: '1',
        fanId: userId,
        balance: 150,
        earnedToday: 12,
      },
      {
        tokenId: generateId(),
        creatorId: '2',
        fanId: userId,
        balance: 89,
        earnedToday: 8,
      },
    ];
  }

  // Collaboration tools
  async scheduleAMA(creatorId: string, title: string, scheduledTime: string): Promise<{
    id: string;
    title: string;
    creatorId: string;
    scheduledTime: string;
    participants: number;
  }> {
    await this.delay(1000);
    
    return {
      id: generateId(),
      title,
      creatorId,
      scheduledTime,
      participants: 0,
    };
  }

  async joinAMA(amaId: string, userId: string, tierLevel: string): Promise<boolean> {
    await this.delay(800);
    
    // Check if user has required tier level
    const requiredTiers = ['VIP', 'Elite'];
    return requiredTiers.includes(tierLevel);
  }

  // Base blockchain integration helpers
  async estimateGas(operation: 'subscribe' | 'purchase' | 'tip', amount: number): Promise<{
    gasEstimate: string;
    gasCostETH: string;
  }> {
    await this.delay(300);
    
    const baseGasEstimates = {
      subscribe: 150000,
      purchase: 100000,
      tip: 80000,
    };
    
    const gasPrice = 0.000000020; // 20 gwei in ETH
    const gasEstimate = baseGasEstimates[operation];
    const gasCostETH = (gasEstimate * gasPrice).toFixed(8);
    
    return {
      gasEstimate: gasEstimate.toString(),
      gasCostETH,
    };
  }

  // Utility method for simulating API delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const api = SocialFiAPI.getInstance();
