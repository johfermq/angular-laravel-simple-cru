export interface UserI {
  id?: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
}

export interface UserStoredI {
  user: UserI;
  type: string;
}

export const UserStoredType = {
  created: "created",
  updated: "updated",
}
