export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
}

export const validateLogin = (credentials: LoginCredentials): AuthResult => {
  const adminEmail = process.env.ADMIN_EMAIL || 'gp.sawargaon@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || '12345';

  if (credentials.email === adminEmail && credentials.password === adminPassword) {
    return {
      success: true,
      message: 'Login successful'
    };
  }

  return {
    success: false,
    message: 'Invalid email or password'
  };
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const authToken = sessionStorage.getItem('admin_authenticated');
  return authToken === 'true';
};

export const setAuthenticated = (authenticated: boolean): void => {
  if (typeof window === 'undefined') return;
  
  if (authenticated) {
    sessionStorage.setItem('admin_authenticated', 'true');
  } else {
    sessionStorage.removeItem('admin_authenticated');
  }
};

export const logout = (): void => {
  setAuthenticated(false);
};
