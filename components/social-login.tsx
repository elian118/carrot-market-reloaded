import Link from 'next/link';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Github from '@/public/github.svg';

const SocialLogin = () => {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/github/start"
        >
          <span>
            <Github className="size-6" />
          </span>
          <span>깃허브로 계속하기</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
          </span>
          <span>SMS로 계속하기</span>
        </Link>
      </div>
    </>
  );
};

export default SocialLogin;
