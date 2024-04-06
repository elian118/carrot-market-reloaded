'use server';

import { revalidatePath } from 'next/cache';

export const getData = async () =>
  await fetch('https://nomad-movies.nomadcoders.workers.dev/movies');

export const fetchData = async () => {
  revalidatePath('/extras');
};
