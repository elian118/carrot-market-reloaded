import { MouseEventHandler } from 'react';
import { FnCODE } from '@/libs/constants';

export type SessionContent = {
  id?: number;
  user_id?: number;
};

export type SessionUser = {
  id: number;
  username: string;
  avatar: string | null;
};

export type SessionDialogContent = {
  type: 'alert' | 'confirm';
  message: string;
  fnCode?: FnCODE;
  args?: object;
  nextPage?: string;
};

export type DialogContentProps = {
  dialogContent: SessionDialogContent;
  children?: React.ReactNode;
};

export type ButtonProps = {
  children: React.ReactNode | string;
  icon?: React.ReactNode;
  type?: 'button' | 'reset' | 'submit';
  href?: string;
  isLoading?: boolean;
  method?: 'post' | 'delete';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  rounded?: boolean;
  outlined?: boolean;
  fullWidth?: boolean;
};

export type FnCode = {
  code: FnCODE;
  fn: (...args: any[]) => void;
};

export type CFStreamResResult = {
  uid: string;
  rtmps: {
    url: string;
    streamKey: string;
  };
  created: string;
  modified: string;
  meta: {
    name: string;
  };
  status: null;
  recording: {
    mode: string;
    requireSignedURLs: boolean;
    allowedOrigins: any;
  };
};

export type CFError = { code: number; message: number };

export type CFRes = {
  result: CFStreamResResult | null;
  success: boolean;
  errors: CFError[];
  messages: [{ code: number; message: string }];
};
