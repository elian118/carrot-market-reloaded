import React from 'react';
import Link from 'next/link';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import FormInput from '@/components/form-input';
import FormBtn from '@/components/form-btn';

const CreateAccount = () => {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">가입을 위해 아래 양식을 채워주세요!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" placeholder="이름" required />
        <FormInput type="email" placeholder="이메일" required />
        <FormInput type="password" placeholder="비밀번호" required />
        <FormInput type="password" placeholder="비밀번호 확인" required />
        <FormBtn loading={false} text="계정 생성" />
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <div>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
          </span>
          <span>SMS로 가입</span>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
