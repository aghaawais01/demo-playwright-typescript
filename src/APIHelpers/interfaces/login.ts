export interface LoginCredentials {
    email: string;
    password: string;
  }
  
export interface TokenResponse {
    token: {
      access: string;
      refresh: string;
    };
    user: object;
  }
  
export interface ParentEntity {
    configuration: null;
    email: string;
    id: number;
    industry_type: number;
    last_onboarding_url: null;
    logo: string;
    name: string;
    phone_number: null;
  }