export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
  userType: string;
};

export type RegisterResponse = {
  data: {
    code: number;
    message: string;
  };
};
