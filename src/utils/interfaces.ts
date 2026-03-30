export interface SignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  designation: string;
  role: {
    name: string;
    type: string;
  };
}
