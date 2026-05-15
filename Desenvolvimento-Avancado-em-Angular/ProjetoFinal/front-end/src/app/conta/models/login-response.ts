export interface ClaimViewModel {
  type: string;
  value: string;
}

export interface UserToken {
  id: string;
  email: string;
  claims: ClaimViewModel[];
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    expiresIn: number;
    userToken: UserToken;
  };
}
