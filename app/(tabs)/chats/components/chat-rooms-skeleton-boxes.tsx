import React from 'react';

const ChatRoomsSkeletonBoxes = () => {
  return (
    <div>
      <div className="border border-neutral-700 rounded-xl mx-4 mb-1 mt-4 py-4 px-6 flex items-center justify-between">
        <div>
          <div className="flex gap-2 items-center h-6">
            <div className="rounded-full bg-neutral-700 size-6" />
            <div className="rounded-md bg-neutral-700 h-6 w-36" />
          </div>
          <div className="flex gap-2 items-center mt-2">
            <p className="rounded-md bg-neutral-700 h-7 w-full" />
            <div className="rounded-lg bg-neutral-700 py-[0.5px] px-2 w-16 h-5" />
          </div>
        </div>
        <div className="w-28 h-10 rounded-md bg-neutral-700" />
      </div>
      <div className="mr-8 max-w-screen-sm flex justify-end">
        <div className="h-5 w-24 rounded-md bg-neutral-700" />
      </div>
    </div>
  );
};

export default ChatRoomsSkeletonBoxes;
