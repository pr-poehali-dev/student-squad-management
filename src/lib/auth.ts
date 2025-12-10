const BACKEND_URLS = {
  register: 'https://functions.poehali.dev/6c49880f-3ac9-4bc3-966d-bcf4c9f12194',
  login: 'https://functions.poehali.dev/ba2195c8-934d-4bb5-9570-9a07749f3107'
};

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  userId?: number;
  message?: string;
  error?: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(BACKEND_URLS.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Ошибка регистрации');
  }

  return result;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(BACKEND_URLS.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Ошибка входа');
  }

  if (result.token) {
    localStorage.setItem('auth_token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
  }

  return result;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
