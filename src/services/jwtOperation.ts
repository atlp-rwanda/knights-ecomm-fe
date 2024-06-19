import { jwtDecode } from 'jwt-decode';

// Define interface for the decoded token
interface DecodedToken {
  id: string;
  email: string;
  userType: string;
  iat: number;
  exp: number;
}

export const decodedToken = (): DecodedToken => {
  // Fetch token from localStorage
  const token: string | null = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  const decoded: DecodedToken = jwtDecode(token);

  const { id, email, userType, iat, exp }: DecodedToken = decoded;

  return { id, email, userType, iat, exp };
};
