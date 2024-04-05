'use client';

import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import { DialogContentProps, SessionDialogContent } from '@/libs/types';
import { fnCodeMap } from '@/libs/constants';
import { useState } from 'react';
import { getDialogContent } from '@/libs/session';
import { useAsync } from '@/libs/hooks';
import { ArrowPathIcon, BellAlertIcon } from '@heroicons/react/24/solid';

export const DialogContent = ({ dialogContent }: DialogContentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<SessionDialogContent>(dialogContent);
  const router = useRouter();

  const reload = async (nextPage: string) => {
    setTimeout(() => window.location.reload(), 100);
    nextPage && router.push(nextPage);
  };

  const closeDialog = async (nextPage?: string) => {
    nextPage ? await reload(nextPage) : router.back();
  };

  const confirm = async () => {
    if (content.fnCode) {
      setIsLoading(true);
      const callback = fnCodeMap.find((e) => e.code === dialogContent.fnCode)?.fn!;
      content.args ? await callback(content.args) : await callback();
    }

    await closeDialog(content.nextPage);
  };

  const cancel = async () => router.back();

  useAsync(async () => {
    const newContent = await getDialogContent();
    setContent(newContent);
  }, []);

  return (
    <div className="absolute w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-60 left-0 top-0">
      <div className="max-w-screen-sm w-full md:w-1/2 p-6">
        <div className="rounded-xl bg-white dark:bg-gray-700">
          {isLoading ? (
            <div
              style={{
                visibility: isLoading ? 'inherit' : 'hidden',
              }}
              className="text-sm font-semibold w-fit mx-auto h-44 flex items-center justify-center"
            >
              <ArrowPathIcon className="size-14 animate-spin" />
            </div>
          ) : (
            <>
              <div className="p-4 font-bold text-2xl">
                <BellAlertIcon className="size-10" />
              </div>
              <div className="h-44 flex justify-center items-center p-4">
                <div dangerouslySetInnerHTML={{ __html: content.message }} />
              </div>
              <div className="flex items-center justify-center p-4 mt-2">
                <div className="w-24">
                  <Button onClick={confirm}>확인</Button>
                </div>
                {content.type === 'confirm' && (
                  <div className="w-24">
                    <Button onClick={cancel}>취소</Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
