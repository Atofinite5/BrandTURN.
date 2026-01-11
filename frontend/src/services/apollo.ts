import axios from 'axios';

// Backend Proxy URL (Use the VITE_API_URL environment variable)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';

export interface ApolloPerson {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  linkedin_url: string;
  title: string;
  email?: string;
  photo_url?: string;
  organization?: {
    name: string;
    logo_url?: string;
    website_url?: string;
    primary_domain?: string;
  };
  city?: string;
  country?: string;
  state?: string;
}

export interface ApolloCompany {
    id: string;
    name: string;
    website_url: string;
    logo_url: string;
    linkedin_url: string;
    twitter_url: string;
    short_description: string;
    primary_phone?: any;
    primary_domain: string;
}

export interface ApolloUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
}

export const searchApollo = async (query: string): Promise<ApolloPerson[]> => {
  try {
    // Call our backend proxy instead of Apollo directly to avoid CORS and hide keys
    const response = await axios.post(`${API_URL}/api/integrations/apollo/search/people`, { query });
    return response.data;
  } catch (error) {
    console.error("Error fetching people from Apollo (via Backend):", error);
    return [];
  }
};

export const searchCompanies = async (query: string): Promise<ApolloCompany[]> => {
    try {
      const response = await axios.post(`${API_URL}/api/integrations/apollo/search/companies`, { query });
      return response.data;
    } catch (error) {
      console.error("Error fetching companies from Apollo (via Backend):", error);
      return [];
    }
};

export const getApolloUsers = async (): Promise<ApolloUser[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/integrations/apollo/users`);
        return response.data;
    } catch (error) {
        console.warn("Error fetching Apollo users (via Backend):", error);
        return [];
    }
};
