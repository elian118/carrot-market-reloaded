const LifeSkeletonBoxes = () => {
  return (
    <div className="*:rounded-md flex gap-5">
      <div className="flex flex-col gap-2 *:h-5 *:rounded-md ">
        <div className="bg-neutral-700 w-20" />
        <div className="bg-neutral-700 w-40" />
        <div className="bg-neutral-700 w-10" />
        <div className="flex gap-2 *:rounded-md *:size-5">
          <div className="bg-neutral-700" />
          <div className="bg-neutral-700" />
        </div>
      </div>
    </div>
  );
};

export default LifeSkeletonBoxes;
