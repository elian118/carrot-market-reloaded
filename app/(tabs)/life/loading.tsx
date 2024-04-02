import React from 'react';
import LifeSkeletonBoxes from '@/app/(tabs)/life/components/life-skeleton-boxes';

const Loading = () => {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, idx) => (
        <LifeSkeletonBoxes key={idx} />
      ))}
    </div>
  );
};

export default Loading;
