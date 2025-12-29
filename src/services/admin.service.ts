import type { AxiosResponse } from 'axios';

import type {
  AdminRegistrationDto,
  AdminRegistrationResponse,
} from '@/dto/admin-registration.dto';

/*
 * TODO: Import your API instance
 * import API from '@/services/api';
 */

const AdminService = {
  /**
   * Register a new admin user
   */
  registerAdmin: (
    body: AdminRegistrationDto,
  ): Promise<AxiosResponse<AdminRegistrationResponse>> => {
    /*
     * TODO: Replace with actual API call
     * return API.post('/admin/register', body);
     */

    // Mock implementation for demonstration
    return Promise.resolve({
      data: {
        id: '1',
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      status: 201,
      statusText: 'Created',
      headers: {},
      config: {} as Record<string, unknown>,
    });
  },

  /**
   * Get all admin users
   */
  getAdmins: (): Promise<AxiosResponse<AdminRegistrationResponse[]>> => {
    /*
     * TODO: Replace with actual API call
     * return API.get('/admin');
     */

    // Mock implementation for demonstration
    return Promise.resolve({
      data: [],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as Record<string, unknown>,
    });
  },
};

export default AdminService;
