'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Settings,
  BarChart3,
  MessageSquare,
  Star
} from 'lucide-react';
import { Modal } from './ui/Modal';
import { Loading } from './ui/Loading';
import { EngagementButton } from './EngagementButton';
import { useAppStore } from '@/lib/store';
import { api } from '@/lib/api';
import { formatCurrency, formatNumber, formatTimeAgo } from '@/lib/utils';
import { Post } from '@/lib/types';

interface CreatorDashboardProps {
  creatorId: string;
}

export function CreatorDashboard({ creatorId }: CreatorDashboardProps) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isScheduleAMAOpen, setIsScheduleAMAOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    subscribers: 0,
    totalPosts: 0,
    engagementRate: 0,
  });

  const { posts, addPost, setLoading } = useAppStore();
  const creatorPosts = posts.filter(post => post.creatorId === creatorId);

  useEffect(() => {
    loadDashboardData();
  }, [creatorId]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate loading creator stats
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        totalEarnings: 2450.75,
        subscribers: 1250,
        totalPosts: 45,
        engagementRate: 8.5,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Loading size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Creator Dashboard</h1>
          <p className="text-white text-opacity-80">Manage your content and community</p>
        </div>
        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white text-opacity-60 text-sm">Total Earnings</p>
              <p className="text-white font-bold text-lg">{formatCurrency(stats.totalEarnings)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white text-opacity-60 text-sm">Subscribers</p>
              <p className="text-white font-bold text-lg">{formatNumber(stats.subscribers)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white text-opacity-60 text-sm">Total Posts</p>
              <p className="text-white font-bold text-lg">{stats.totalPosts}</p>
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
            <div className="p-2 bg-orange-500 bg-opacity-20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-white text-opacity-60 text-sm">Engagement Rate</p>
              <p className="text-white font-bold text-lg">{stats.engagementRate}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setIsScheduleAMAOpen(true)}
            className="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
          >
            <Calendar className="w-5 h-5 text-accent" />
            <span className="text-white">Schedule AMA</span>
          </button>
          <button className="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all">
            <MessageSquare className="w-5 h-5 text-accent" />
            <span className="text-white">View Messages</span>
          </button>
          <button className="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all">
            <Settings className="w-5 h-5 text-accent" />
            <span className="text-white">Settings</span>
          </button>
          <button className="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all">
            <Star className="w-5 h-5 text-accent" />
            <span className="text-white">Tier Settings</span>
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Posts</h3>
        <div className="space-y-3">
          {creatorPosts.slice(0, 3).map((post) => (
            <div key={post.postId} className="bg-white bg-opacity-5 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-white text-sm line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-white text-opacity-60 text-xs">
                      {formatTimeAgo(post.timestamp)}
                    </span>
                    {post.isPremium && (
                      <span className="text-accent text-xs font-medium">
                        Premium • {formatCurrency(post.price || 0)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <EngagementButton
                    type="like"
                    count={post.likes}
                    disabled
                  />
                  <EngagementButton
                    type="comment"
                    count={post.comments}
                    disabled
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        creatorId={creatorId}
        onPostCreated={(post) => {
          addPost(post);
          setIsCreatePostOpen(false);
        }}
      />

      {/* Schedule AMA Modal */}
      <ScheduleAMAModal
        isOpen={isScheduleAMAOpen}
        onClose={() => setIsScheduleAMAOpen(false)}
        creatorId={creatorId}
      />
    </div>
  );
}

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorId: string;
  onPostCreated: (post: Post) => void;
}

function CreatePostModal({ isOpen, onClose, creatorId, onPostCreated }: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const newPost = await api.createPost({
        creatorId,
        content: content.trim(),
        contentType: 'text',
        isPremium,
        price: isPremium ? parseFloat(price) || 0 : undefined,
      });

      onPostCreated(newPost);
      setContent('');
      setIsPremium(false);
      setPrice('');
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Post" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts with your community..."
            className="w-full h-32 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-accent resize-none"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="w-4 h-4 text-accent bg-transparent border-white border-opacity-20 rounded focus:ring-accent"
            />
            <span className="text-white text-sm">Premium Content</span>
          </label>
        </div>

        {isPremium && (
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Price (ETH)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.01"
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-accent"
            />
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-white text-opacity-80 hover:text-opacity-100 transition-opacity"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loading size="sm" />}
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

interface ScheduleAMAModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorId: string;
}

function ScheduleAMAModal({ isOpen, onClose, creatorId }: ScheduleAMAModalProps) {
  const [title, setTitle] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !scheduledTime) return;

    setIsSubmitting(true);
    try {
      await api.scheduleAMA(creatorId, title.trim(), scheduledTime);
      setTitle('');
      setScheduledTime('');
      onClose();
    } catch (error) {
      console.error('Failed to schedule AMA:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule AMA Session" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            AMA Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ask me anything about..."
            className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-accent"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Scheduled Time
          </label>
          <input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-white text-opacity-80 hover:text-opacity-100 transition-opacity"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !scheduledTime}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loading size="sm" />}
            {isSubmitting ? 'Scheduling...' : 'Schedule AMA'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
