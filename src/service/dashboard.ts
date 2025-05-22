import { fetchData } from '../lib/api';

interface DashboardResponse {
  message: string;
  user: {
    id_admin: number;
    userAdmin: string;
  };
}

export const getDashboardData = async (): Promise<DashboardResponse> => {
  // No es necesario agregar el header Authorization aquí, fetchData ya lo hace
  return fetchData<DashboardResponse>('/api/dashboard');
};
