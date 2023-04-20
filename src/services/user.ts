import { server, invoke } from './server';

export const userService = {
  getFilterTemplates: () => invoke<FilterTemplate[]>(server.get('/user/filter-templates'))
};
