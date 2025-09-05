'use client';

interface ProfilePicProps {
  src: string;
  alt: string;
  variant?: 'small' | 'large';
  className?: string;
}

export function ProfilePic({ src, alt, variant = 'small', className = '' }: ProfilePicProps) {
  const sizeClasses = {
    small: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <div className={`${sizeClasses[variant]} ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
        {alt.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}
