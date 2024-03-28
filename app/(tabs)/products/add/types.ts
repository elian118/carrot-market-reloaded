export type FormDataType = {
  photo: FormDataEntryValue | null;
  title: FormDataEntryValue | null;
  price: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
};

type CFErrors = {
  code: number;
  message: string;
};

type UploadURLResResult = {
  id: string;
  uploadURL: string;
};

export type UploadURLRes = {
  result: UploadURLResResult | null;
  success: boolean;
  errors: CFErrors[];
  messages: any[];
  result_info?: any;
};

type UploadImageResResult = {
  id: string;
  metadata: {
    key: string;
  };
  uploaded: string;
  requireSignedURLs: true;
  variants: string[];
  draft: boolean;
};

export type UploadImageRes = {
  result: UploadImageResResult | null;
  success: boolean;
  errors: CFErrors[];
  messages: any[];
};
