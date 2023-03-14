import { ISensorStore } from '@interfaces/sensor';
import { sensorService } from '@services/sensor';
import { createSimpleModalStore } from '@utils/createSimpleModalStore';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useSensorsStore = create<ISensorStore>()(
  devtools((set) => ({
    sensors: [], // Init state
    fetch: async (clusterId: string) => {
      const sensors = await sensorService.getByClusterId(clusterId);
      set(() => ({ sensors }));
    }
  }))
);

export const useConfigSensorModalStore = createSimpleModalStore()
export const useRemoveSensorModalStore = createSimpleModalStore();
