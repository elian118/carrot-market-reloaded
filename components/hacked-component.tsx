'use client';

import { fetchFromAPI } from '@/app/extras/[[...potato]]/actions';

const HackedComponent = ({ data }: any) => {
  fetchFromAPI().then();
  return <h1>해킹됨</h1>;
};

export default HackedComponent;
