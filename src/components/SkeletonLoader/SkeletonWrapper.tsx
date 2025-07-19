import type React from 'react';
import type { ReactNode } from 'react';
import { ContentCategorySkeleton, HeroBannerSkeleton } from './ContentSkeletons';

interface SkeletonWrapperProps {
  loading: boolean;
  skeleton: 'hero' | 'category' | ReactNode;
  children: ReactNode;
}

/**
 * A wrapper component that shows skeleton loading states
 * Usage:
 * <SkeletonWrapper loading={isLoading} skeleton="hero">
 *   <HeroBanner />
 * </SkeletonWrapper>
 */
export const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  loading,
  skeleton,
  children,
}) => {
  if (!loading) {
    return <>{children}</>;
  }

  // Return predefined skeleton types
  if (skeleton === 'hero') {
    return <HeroBannerSkeleton />;
  }

  if (skeleton === 'category') {
    return <ContentCategorySkeleton />;
  }

  // Return custom skeleton component
  return <>{skeleton}</>;
};

export default SkeletonWrapper;
