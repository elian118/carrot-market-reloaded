import FormInput from '@/components/form-input';
import FormBtn from '@/components/form-btn';
import SocialLogin from '@/components/social-login';

const CreateAccount = () => {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">가입을 위해 아래 양식을 채워주세요!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput name="name" type="text" placeholder="이름" required />
        <FormInput name="email" type="email" placeholder="이메일" required />
        <FormInput name="password" type="password" placeholder="비밀번호" required />
        <FormInput
          name="confirmPW"
          type="password"
          placeholder="비밀번호 확인"
          required
        />
        <FormBtn text="계정 생성" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default CreateAccount;
