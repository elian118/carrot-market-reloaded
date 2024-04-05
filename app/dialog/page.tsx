'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DialogPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, []);

  return <div />;
};

export default DialogPage;
