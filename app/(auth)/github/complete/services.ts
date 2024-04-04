import { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';
import { GitHubEmail } from '@/app/(auth)/github/complete/types';

export const getAccessToken = async (req: NextRequest) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const code = req.nextUrl.searchParams.get('code');

  if (!code) return notFound();

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  });
  const accessTokenUrl = `${baseUrl}?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });

  const { error, access_token } = await accessTokenResponse.json();

  if (error) return new Response(null, { status: 400 });
  return access_token;
};

export const getGitHubUserProfile = async (req: NextRequest, token: string) => {
  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-cache',
  });

  return await userProfileResponse.json();
};

export const getUserEmail = async (req: NextRequest, token: string) => {
  const userEmailsResponse = await fetch('https://api.github.com/user/emails', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-cache',
  });

  const emails: GitHubEmail[] | null | undefined = await userEmailsResponse.json();
  return emails && emails.length > 0 ? emails[0].email : null;
};

export const getEmailId = (email: string | null) =>
  email ? email.slice(0, email.indexOf('@')) : null;
