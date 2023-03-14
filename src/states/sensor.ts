import { ISensorStore } from '@interfaces';
import { sensorService } from '@services';
import { createSimpleModalStore } from '@utils';
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
