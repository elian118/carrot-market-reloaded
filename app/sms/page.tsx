import FormInput from '@/components/form-input';
import FormBtn from '@/components/form-btn';

const SMSLogin = () => {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">전화번호 인증을 진행해주세요.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="number" placeholder="전화번호" required />
        <FormInput type="number" placeholder="인증번호" required />
        <FormBtn loading={false} text="인증하기" />
      </form>
    </div>
  );
};

export default SMSLogin;
