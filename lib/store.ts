import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Creator, Fan, Post, Subscription, RewardToken, EngagementAction } from './types';

interface AppState {
  // User state
  currentUser: Fan | null;
  isAuthenticated: boolean;
  
  // Creators
  creators: Creator[];
  featuredCreators: Creator[];
  
  // Posts
  posts: Post[];
  userPosts: Post[];
  
  // Subscriptions
  userSubscriptions: Subscription[];
  
  // Rewards
  userRewards: RewardToken[];
  totalRewardTokens: number;
  
  // Engagement
  engagementHistory: EngagementAction[];
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentUser: (user: Fan | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setCreators: (creators: Creator[]) => void;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  addSubscription: (subscription: Subscription) => void;
  removeSubscription: (subscriptionId: string) => void;
  addEngagement: (action: EngagementAction) => void;
  updateRewardTokens: (tokens: RewardToken[]) => void;
  addRewardTokens: (amount: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      isAuthenticated: false,
      creators: [],
      featuredCreators: [],
      posts: [],
      userPosts: [],
      userSubscriptions: [],
      userRewards: [],
      totalRewardTokens: 0,
      engagementHistory: [],
      isLoading: false,
      error: null,

      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),
      
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      
      setCreators: (creators) => {
        const featured = creators.filter((_, index) => index < 3);
        set({ creators, featuredCreators: featured });
      },
      
      setPosts: (posts) => set({ posts }),
      
      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts],
        userPosts: post.creatorId === state.currentUser?.fanId 
          ? [post, ...state.userPosts] 
          : state.userPosts
      })),
      
      updatePost: (postId, updates) => set((state) => ({
        posts: state.posts.map(post => 
          post.postId === postId ? { ...post, ...updates } : post
        ),
        userPosts: state.userPosts.map(post => 
          post.postId === postId ? { ...post, ...updates } : post
        )
      })),
      
      deletePost: (postId) => set((state) => ({
        posts: state.posts.filter(post => post.postId !== postId),
        userPosts: state.userPosts.filter(post => post.postId !== postId)
      })),
      
      addSubscription: (subscription) => set((state) => ({
        userSubscriptions: [...state.userSubscriptions, subscription]
      })),
      
      removeSubscription: (subscriptionId) => set((state) => ({
        userSubscriptions: state.userSubscriptions.filter(
          sub => sub.subscriptionId !== subscriptionId
        )
      })),
      
      addEngagement: (action) => set((state) => ({
        engagementHistory: [action, ...state.engagementHistory],
        totalRewardTokens: state.totalRewardTokens + action.rewardTokens
      })),
      
      updateRewardTokens: (tokens) => {
        const total = tokens.reduce((sum, token) => sum + token.balance, 0);
        set({ userRewards: tokens, totalRewardTokens: total });
      },
      
      addRewardTokens: (amount) => set((state) => ({
        totalRewardTokens: state.totalRewardTokens + amount
      })),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'socialfi-connect-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        userSubscriptions: state.userSubscriptions,
        userRewards: state.userRewards,
        totalRewardTokens: state.totalRewardTokens,
        engagementHistory: state.engagementHistory,
      }),
    }
  )
);

// Selectors for better performance
export const useCurrentUser = () => useAppStore((state) => state.currentUser);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useCreators = () => useAppStore((state) => state.creators);
export const useFeaturedCreators = () => useAppStore((state) => state.featuredCreators);
export const usePosts = () => useAppStore((state) => state.posts);
export const useUserSubscriptions = () => useAppStore((state) => state.userSubscriptions);
export const useRewardTokens = () => useAppStore((state) => state.totalRewardTokens);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);
