export type ILoginUser = {
   email: string;
   password: string;
};
export type ILoginResponse = {
   accessToken: string;
   refreshToken?: string;
};
export type IRefreshToken = {
   accessToken: string;
   refreshToken?: string;
};

export type IChangePassword = {
   oldPassword: string;
   newPassword: string;
};
