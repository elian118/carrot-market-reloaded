export type ActionState = {
  token: boolean;
  error?: {
    formErrors: string[];
    fieldErrors: any;
  };
};

export type FormState = {
  phone: string;
  token: string;
};
