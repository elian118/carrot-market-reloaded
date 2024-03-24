import { NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  console.log('안녕');
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
