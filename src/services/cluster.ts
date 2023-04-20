import { server, invoke } from './server';

export const clusterService = {
  getAll: () => invoke<Cluster[]>(server.get('/clusters')),
  create: (payload: CreateClusterPayload) => invoke<string>(server.post('/clusters', payload)),
  update: (clusterId: string, payload: CreateClusterPayload) =>
    invoke<string>(server.put(`/clusters/${clusterId}`, payload)),
  delete: (clusterId: string) => invoke<string>(server.delete(`/clusters/${clusterId}`))
};
