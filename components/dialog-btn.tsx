'use client';

import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import { clearDialogSession, saveDialogData } from '@/libs/session';
import { DialogContentProps } from '@/libs/types';

type DialogBtnProps = {
  method?: 'post' | 'delete';
  type?: 'button' | 'reset' | 'submit';
} & DialogContentProps;

const DialogBtn = ({
  dialogContent,
  children,
  method = 'post',
  type = 'button',
}: DialogBtnProps) => {
  const router = useRouter();

  const pushDialogSession = async () => {
    await clearDialogSession(); // 초기화
    await saveDialogData(dialogContent);
    router.push('/dialog');
  };

  return (
    <Button type={type} onClick={pushDialogSession} method={method}>
      {children}
    </Button>
  );
};

export default DialogBtn;
