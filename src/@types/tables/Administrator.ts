export type Administrator = {
  id?: number;
  username?: string;
  hashedPassword?: string;
  salt?: string;
  firstName?: string;
  lastName?: string;
  employeeNumber?: string;
  birthday?: Date;
};
