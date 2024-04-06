import React from 'react';

const SkeletonBoxes = () => {
  return (
    <div className="*:rounded-md flex gap-5 p-4">
      <div className="size-28 bg-neutral-700" />
      <div className="flex flex-col gap-2 *:h-5 *:rounded-md ">
        <div className="bg-neutral-700 w-40" />
        <div className="bg-neutral-700 w-20" />
        <div className="bg-neutral-700 w-10" />
      </div>
    </div>
  );
};

export default SkeletonBoxes;
