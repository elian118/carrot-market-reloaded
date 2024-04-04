export type SessionContent = {
  id?: number;
  user_id?: number;
};

export type SessionUser = {
  id: number;
  username: string;
  avatar: string | null;
};
