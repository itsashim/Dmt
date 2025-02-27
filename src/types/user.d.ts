export interface UserModel {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  role?: "ADMIN" | "BUYER" | "SELLER";
  isSeller?: boolean;
  isEmailConfirmed?: boolean;
  emailVerifyToken?: string;
  passwordResetToken?: string;
  isPhoneNumberConfirmed?: boolean;
  isCountryConfirmed?: boolean;
  status?: "ACTIVE" | "BLOCKED";
  createdAt?: string;
  updatedAt?: string;
}
