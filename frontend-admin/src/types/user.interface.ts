export interface IUser {
  userId: string;
  email: string;
  name: string;
  lastname: string;
  dni: string;
  roles: Role[];
}

export interface Role {
  roleId: string;
  name: string;
}
