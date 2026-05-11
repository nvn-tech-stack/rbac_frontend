export interface SignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  _id: string;
  first_name: string;
  last_name?: string;
  email: string;
  designation: string;
  role: {
    name: string;
    type: string;
    _id: string;
  };
  last_sign_in: any;
  status: string;
  phone: string;
}

export interface Module {
  id: string;
  _id: string;
  name: string;
  type: string;
}

export interface Role {
  id: string;
  _id: string;
  name: string;
  status: string;
  type: string;
}

export interface Permission {
  id: string;
  _id: string;
  module_id: string;
  role_id: string;
  is_view: boolean;
  is_edit: boolean;
  is_delete: boolean;
  is_create: boolean;
}

export interface Chat {
  id: string;
  _id: string;
  messages: any[];

  is_deleted: boolean;

  created_by: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  tag: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  createdAt: Date;
}
