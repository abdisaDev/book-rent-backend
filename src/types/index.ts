export type UserRegistrationType = {
  email: string;
  password: string;
  location: string;
  phone_number: string;
  role: string;
  status: boolean;
  revenue: number;
  isOwnerApproved: boolean;
};

export type AuthValidationType = {
  email: string;
  password: string;
};
