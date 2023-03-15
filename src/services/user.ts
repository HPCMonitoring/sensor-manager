import { server } from './server';

export const userService = {
  getFilterTemplates: async function (): Promise<Array<FilterTemplate>> {
    const response = server.get('/user/filter-templates');
    return (await response).data;
  }
};
