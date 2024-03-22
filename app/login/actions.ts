'use server';

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(prevState);
  await new Promise((res) => setTimeout(res, 3000));
  return {
    errors: ['잘못된 비밀번호,', '비밀번호가 너무 깁니다.'],
  };
};
