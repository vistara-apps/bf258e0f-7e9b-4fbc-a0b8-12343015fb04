'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ size = 'md', text, fullScreen = false }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const content = (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizeClasses[size]} text-accent`} />
      </motion.div>
      {text && (
        <p className={`text-white text-opacity-80 ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="glass-card p-6">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className = '', count = 1 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`bg-white bg-opacity-10 rounded-lg ${className}`}
        />
      ))}
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <LoadingSkeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-3 w-16" />
        </div>
      </div>
      <LoadingSkeleton className="h-16 w-full" />
      <div className="flex gap-4">
        <LoadingSkeleton className="h-8 w-16" />
        <LoadingSkeleton className="h-8 w-16" />
        <LoadingSkeleton className="h-8 w-16" />
      </div>
    </div>
  );
}

export function CreatorSkeleton() {
  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <LoadingSkeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <LoadingSkeleton className="h-4 w-32" />
          <LoadingSkeleton className="h-3 w-24" />
        </div>
      </div>
      <LoadingSkeleton className="h-12 w-full" />
      <div className="flex justify-between">
        <LoadingSkeleton className="h-6 w-20" />
        <LoadingSkeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
