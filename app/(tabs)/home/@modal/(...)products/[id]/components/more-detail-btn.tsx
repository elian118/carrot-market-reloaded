'use client';

import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid';

export const MoreDetailBtn = () => {
  const onClickMore = () => {
    window.location.reload();
  };

  return (
    <div>
      <button onClick={onClickMore}>
        <MagnifyingGlassPlusIcon className="size-10" />
      </button>
    </div>
  );
};
