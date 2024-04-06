'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { startStream } from '@/app/streams/add/services';

const AddStream = () => {
  const [state, action] = useFormState(startStream, null);

  return (
    <form action={action} className="p-5 flex flex-col gap-2">
      <Input name="title" type="text" errors={state?.formErrors} />
      <Button>방송 시작</Button>
    </form>
  );
};

export default AddStream;
