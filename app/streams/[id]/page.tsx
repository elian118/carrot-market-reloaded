import { notFound } from 'next/navigation';
import { getStream } from '@/app/streams/[id]/services';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/solid';
import { getUserProfile } from '@/libs/session';

const StreamDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const session = await getUserProfile();
  if (isNaN(id)) return notFound();
  const stream = await getStream(id);
  if (!stream) return notFound();

  return (
    <div className="p-10">
      <div className="relative aspect-video">
        {/* Todo: 추후, 클라우드플레어에서 스트림 서비스를 개시하면 실제 iframe 정보로 교체하기 */}
        <iframe
          src={`https://${process.env.CLOUDFLARE_DOMAIN}/dc98714ad120275903d1c681fa987fbc/iframe`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          className="w-full h-full rounded-md"
        ></iframe>
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">
          {stream.user.avatar !== null ? (
            <Image
              src={stream.user.avatar}
              width={40}
              height={40}
              alt={stream.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{stream.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{stream.title}</h1>
      </div>
      {stream.user_id === session.id! && (
        <div className="bg-yellow-200 text-black p-5 rounded-md">
          <div className="flex gap-2">
            <span className="font-semibold">Stream URL:</span>
            <span>rtmps://live.cloudflare.com:443/live/</span>
          </div>
          <div className="flex flex-wrap">
            <span className="font-semibold">Secret Key:</span>
            <span className="text-ellipsis">{stream.stream_key}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamDetail;
