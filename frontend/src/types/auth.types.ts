export interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  age: number;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: 'admin' | 'trainer' | 'client';
  };
  token: string;
}