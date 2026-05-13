export interface LoginResponse {
  accessToken: string;
  userToken: {
    id: string;
    email: string;
    claims: string[];
  };
}
