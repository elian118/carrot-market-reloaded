'use client';

import FormInput from '@/components/form-input';
import FormBtn from '@/components/form-btn';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { handleForm } from './actions';

const LogIn = () => {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">이메일과 비밀번호를 입력하세요.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="이메일" required />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={state?.errors ?? []}
        />
        <FormBtn text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default LogIn;
