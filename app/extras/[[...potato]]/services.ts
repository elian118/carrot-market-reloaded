'use server';

import { revalidatePath } from 'next/cache';
import { experimental_taintObjectReference, experimental_taintUniqueValue } from 'react';

export const getFetchData = async () =>
  await fetch('https://nomad-movies.nomadcoders.workers.dev/movies');

export const fetchData = async () => {
  revalidatePath('/extras');
};

export const getHackedData = () => {
  const keys = {
    apiKey: '11134136',
    secret: '32143125',
  };
  // error test
  experimental_taintObjectReference('API Keys were leaked!!!', keys);
  experimental_taintUniqueValue('Secret Key was exposed!', keys, keys.secret);
  return keys;
};
