/* 비속어 포함여부 검사 = hasSlang()
.refine(
  (username) =>
    !username.includes('병신') &&
    !username.includes('씨발') &&
    !username.includes('새끼'),
  '이름에 비속어가 포함돼 있습니다.',
)
*/
export const hasSlang = /^(?!.*(병신|씨발|새끼)).*$/u;

export const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/;

export const isValidPw = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;
