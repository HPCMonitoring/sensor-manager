import { CLUSTER_NOT_FOUND, CREATE_CLUSTER_SUCCESS, UPDATE_CLUSTER_SUCCESS, DELETE_CLUSTER_SUCCESS } from '@constants/errorMessage';
import { IClusterStore, IClusterModalStore } from '@interfaces/cluster';
import { clusterService } from '@services/cluster';
import { createSimpleModalStore } from '@utils/createSimpleModalStore';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useClustersStore = create<IClusterStore>()(
  devtools((set, get) => ({
    clusters: [], // Init state
    fetch: async () => {
      const clusters = await clusterService.getAll();
      set(() => ({ clusters }));
    },
    getById: (clusterId: string) => {
      const cluster = get().clusters.find((item) => item.id === clusterId);
      if (!cluster) throw new Error(CLUSTER_NOT_FOUND);
      return cluster;
    },
    create: async (payload: CreateClusterPayload) => {
      try {
        const cluster = await clusterService.create(payload);
        set((state) => ({
          clusters: [
            ...state.clusters,
            {
              ...cluster,
              numOfActiveSensors: 0,
              numOfSensors: 0
            }
          ]
        }));
        toast.success(CREATE_CLUSTER_SUCCESS);
      } catch (err) {
        toast.error((err as Exception).message);
      }
    },
    update: async (clusterId: string, payload: UpdateClusterPayload) => {
      try {
        await clusterService.update(clusterId, payload);
        set((state) => {
          const clusters = [...state.clusters];
          const cluster = clusters.find((item) => item.id === clusterId);
          if (!cluster) throw new Error(CLUSTER_NOT_FOUND);
          cluster.name = payload.name;
          cluster.remarks = payload.remarks;
          return { clusters };
        });
        toast.success(UPDATE_CLUSTER_SUCCESS);
      } catch (err) {
        toast.error((err as Exception).message);
      }
    },
    delete: async (clusterId: string) => {
      try {
        await clusterService.delete(clusterId);
        set((state) => {
          const clusters = [...state.clusters];
          const idx = clusters.findIndex((item) => item.id === clusterId);
          if (idx === -1) throw new Error(CLUSTER_NOT_FOUND);
          clusters.splice(idx, 1);
          return { clusters };
        });
        toast.success(DELETE_CLUSTER_SUCCESS);
      } catch (err) {
        toast.error((err as Exception).message);
      }
    }
  }))
);

export const useClusterModalStore = create<IClusterModalStore>()(
  devtools((set) => ({
    mode: { action: 'create' }, // Init state,
    isOpen: false,
    open: (mode: ModalOpenMode) => set(() => ({ mode, isOpen: true })),
    close: () => set((state) => ({ ...state, isOpen: false }))
  }))
);

export const useDeleteClusterModalStore = createSimpleModalStore();
