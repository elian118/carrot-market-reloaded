import { getDialogContent } from '@/libs/session';
import { DialogContent } from '@/app/@dial/(.)dialog/components';

const Dialog = async () => {
  const dialogContent = await getDialogContent();

  return dialogContent && <DialogContent dialogContent={dialogContent} />;
};

export default Dialog;
