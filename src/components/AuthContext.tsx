import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';

interface JWTTokens {
  accessToken: string,
  refreshToken: string,
}

interface User {
  username: string,
  jwtTokens: JWTTokens,
}

interface Auth {
  user: User,
  login: (user: User) => void,
  logout: () => void,
}

export const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({} as User);

  const login = (user: User) => {
    setUser(user);
  }

  const logout = () => {
    setUser({} as User);
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext);
  return { user, login, logout };
};
