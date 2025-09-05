'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  TrendingUp, 
  Gift, 
  Trophy,
  Calendar,
  Star,
  Zap,
  Target
} from 'lucide-react';
import { Loading, LoadingSkeleton } from './ui/Loading';
import { useAppStore, useRewardTokens, useCurrentUser } from '@/lib/store';
import { api } from '@/lib/api';
import { formatNumber, formatTimeAgo } from '@/lib/utils';
import { RewardToken, EngagementAction } from '@/lib/types';

export function RewardsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [rewardTokens, setRewardTokens] = useState<RewardToken[]>([]);
  const [recentActivity, setRecentActivity] = useState<EngagementAction[]>([]);
  const [dailyGoal, setDailyGoal] = useState(50);
  const [dailyProgress, setDailyProgress] = useState(0);

  const currentUser = useCurrentUser();
  const totalTokens = useRewardTokens();

  useEffect(() => {
    if (currentUser) {
      loadRewardsData();
    }
  }, [currentUser]);

  const loadRewardsData = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const [tokens, activity] = await Promise.all([
        api.getUserRewardTokens(currentUser.fanId),
        // Mock recent activity
        Promise.resolve([
          {
            type: 'like' as const,
            postId: '1',
            userId: currentUser.fanId,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            rewardTokens: 1,
          },
          {
            type: 'comment' as const,
            postId: '2',
            userId: currentUser.fanId,
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            rewardTokens: 3,
          },
          {
            type: 'share' as const,
            postId: '3',
            userId: currentUser.fanId,
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            rewardTokens: 5,
          },
        ])
      ]);

      setRewardTokens(tokens);
      setRecentActivity(activity);
      
      // Calculate daily progress
      const today = new Date().toDateString();
      const todayActivity = activity.filter(a => 
        new Date(a.timestamp).toDateString() === today
      );
      const todayTokens = todayActivity.reduce((sum, a) => sum + a.rewardTokens, 0);
      setDailyProgress(todayTokens);

    } catch (error) {
      console.error('Failed to load rewards data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton className="h-32" />
        <div className="grid grid-cols-2 gap-4">
          <LoadingSkeleton className="h-24" />
          <LoadingSkeleton className="h-24" />
        </div>
        <LoadingSkeleton className="h-48" />
      </div>
    );
  }

  const progressPercentage = Math.min((dailyProgress / dailyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Rewards Dashboard</h1>
        <p className="text-white text-opacity-80">
          Earn tokens by engaging with your favorite creators
        </p>
      </div>

      {/* Total Tokens Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-accent bg-opacity-20 rounded-full">
            <Coins className="w-8 h-8 text-accent" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {formatNumber(totalTokens)}
        </h2>
        <p className="text-white text-opacity-80">Total Reward Tokens</p>
        
        {/* Token breakdown */}
        <div className="mt-4 space-y-2">
          {rewardTokens.map((token) => (
            <div key={token.tokenId} className="flex justify-between items-center">
              <span className="text-white text-opacity-60 text-sm">
                Creator {token.creatorId}
              </span>
              <div className="text-right">
                <span className="text-white font-medium">{token.balance}</span>
                <span className="text-accent text-xs ml-2">
                  +{token.earnedToday} today
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Daily Goal Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            <h3 className="text-white font-semibold">Daily Goal</h3>
          </div>
          <span className="text-white text-opacity-80 text-sm">
            {dailyProgress} / {dailyGoal} tokens
          </span>
        </div>
        
        <div className="w-full bg-white bg-opacity-10 rounded-full h-3 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-gradient-to-r from-accent to-orange-400 h-3 rounded-full"
          />
        </div>
        
        <p className="text-white text-opacity-60 text-xs">
          {dailyProgress >= dailyGoal 
            ? '🎉 Goal achieved! Keep up the great work!' 
            : `${dailyGoal - dailyProgress} more tokens to reach your daily goal`
          }
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white text-opacity-60 text-sm">This Week</p>
              <p className="text-white font-bold text-lg">+{formatNumber(156)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white text-opacity-60 text-sm">Streak</p>
              <p className="text-white font-bold text-lg">7 days</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Earning Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-4"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-accent" />
          Earning Opportunities
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 bg-opacity-20 rounded-lg">
                <Star className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Like a post</p>
                <p className="text-white text-opacity-60 text-xs">Quick and easy</p>
              </div>
            </div>
            <span className="text-accent font-medium">+1 token</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg">
                <Trophy className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Comment on a post</p>
                <p className="text-white text-opacity-60 text-xs">Share your thoughts</p>
              </div>
            </div>
            <span className="text-accent font-medium">+3 tokens</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Share a post</p>
                <p className="text-white text-opacity-60 text-xs">Spread the word</p>
              </div>
            </div>
            <span className="text-accent font-medium">+5 tokens</span>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-4"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'like' ? 'bg-red-500 bg-opacity-20' :
                    activity.type === 'comment' ? 'bg-blue-500 bg-opacity-20' :
                    'bg-green-500 bg-opacity-20'
                  }`}>
                    {activity.type === 'like' && <Star className="w-4 h-4 text-red-400" />}
                    {activity.type === 'comment' && <Trophy className="w-4 h-4 text-blue-400" />}
                    {activity.type === 'share' && <TrendingUp className="w-4 h-4 text-green-400" />}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium capitalize">
                      {activity.type}d a post
                    </p>
                    <p className="text-white text-opacity-60 text-xs">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
                <span className="text-accent font-medium">
                  +{activity.rewardTokens}
                </span>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-white text-opacity-60">
                No recent activity. Start engaging to earn tokens!
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6 text-center"
      >
        <h3 className="text-xl font-semibold text-white mb-2">
          Ready to Earn More?
        </h3>
        <p className="text-white text-opacity-80 mb-4">
          Engage with creators and build your token balance
        </p>
        <button className="btn-primary">
          Explore Content
        </button>
      </motion.div>
    </div>
  );
}
