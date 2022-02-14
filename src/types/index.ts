export type AuthContextType = {
  token: string | null;
  hasToken: boolean;
  handleLogin: (data: LoginFormValueType) => Promise<void>;
  handleLogout: () => void;
};

export type GetTokenType = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type ThemeType = 'LIGHT' | 'DARK';

export type ThemeContextType = {
  theme: ThemeType;
  handleToggleTheme: () => void;
};

export type LoginFormValueType = {
  username: string;
  password: string;
};

export type SupplierType = {
  publicId?: string;
  name?: string;
  cnpj?: string;
  phoneNumber?: string;
  ownerName?: string;
};

export type SupplierDetailType = {
  publicId?: string;
  name?: string;
  cnpj?: string;
  phoneNumber?: string;
  zipCode?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
};
