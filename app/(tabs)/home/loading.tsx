import SkeletonBoxes from '@/components/skeleton-boxes';

const Loading = () => {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, idx) => (
        <SkeletonBoxes key={idx} />
      ))}
    </div>
  );
};

export default Loading;
