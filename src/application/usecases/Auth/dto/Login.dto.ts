export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginOutput {
  token: string;
  username: string;
  role: string;
  avatar?: string;
}
