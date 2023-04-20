import { REMOVE_SENSOR_SUCCESS, UPDATE_SENSOR_SUCCESS } from "@constants";
import {
  IConfigSensorModalStore,
  IKafkaJobConfigModalStore,
  IDeleteSensorModalStore,
  ISensorStore
} from "@interfaces";
import { sensorService } from "@services";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useFilterTemplateStore } from "./filterTemplate";

export const useSensorsStore = create<ISensorStore>()(
  devtools((set, get) => ({
    sensors: [],
    fetch: async (clusterId: string) => {
      const sensors = await sensorService.getByClusterId(clusterId);
      set(() => ({ sensors }));
    },
    delete: async (sensorId: string) => {
      try {
        await sensorService.delete(sensorId);
        const sensors: SensorSummary[] = JSON.parse(JSON.stringify(get().sensors));
        const deletedSensorIdx = sensors.findIndex((sensor) => sensor.id === sensorId);
        if (deletedSensorIdx !== -1) sensors.splice(deletedSensorIdx, 1);
        toast.success(REMOVE_SENSOR_SUCCESS);
        set(() => ({ sensors }));
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
    update: async (sensorId: string, payload: UpdateSensorPayload) => {
      try {
        await sensorService.update(sensorId, payload);
        const sensors: SensorSummary[] = JSON.parse(JSON.stringify(get().sensors));
        const modifiedSensor = sensors.find((sensor) => sensor.id === sensorId);
        if (modifiedSensor) {
          modifiedSensor.name = payload.name;
          modifiedSensor.remarks = payload.remarks;
          set(() => ({ sensors }));
          toast.success(UPDATE_SENSOR_SUCCESS);
        }
      } catch (err) {
        toast.error((err as Error).message);
      }
    }
  }))
);

export const useConfigSensorModalStore = create<IConfigSensorModalStore>()(
  devtools((set) => ({
    sensor: null,
    open: async (sensorId) => {
      try {
        const sensor = await sensorService.getById(sensorId);
        set(() => ({ sensor }));
      } catch (err) {
        toast.error((err as Error).message);
      }
    },
    close() {
      set(() => ({ sensor: null }));
    }
  }))
);

export const useDeleteSensorModalStore = create<IDeleteSensorModalStore>()(
  devtools((set) => ({
    sensorId: null,
    open(sensorId) {
      set(() => ({ sensorId }));
    },
    close() {
      set(() => ({ sensorId: null }));
    }
  }))
);

export const useKafkaJobConfigModalStore = create<IKafkaJobConfigModalStore>()(
  devtools((set) => ({
    job: null,
    open: (job) => set(() => ({ job })),
    close: () => set(() => ({ job: null })),
    setBrokerUrl: (brokerUrl) => {
      set((state) => {
        if (!state.job) return {};
        return { job: { ...state.job, brokerUrl } };
      });
    },
    setInterval: (interval) => {
      set((state) => {
        if (!state.job) return {};
        return { job: { ...state.job, interval } };
      });
    },
    setScript(script) {
      set((state) => {
        if (!state.job) return {};
        return { job: { ...state.job, script } };
      });
    },
    setTopicName(topicName) {
      set((state) => {
        if (!state.job) return {};
        return { job: { ...state.job, topicName } };
      });
    },
    setUsingTemplate(templateId) {
      if (templateId === null) {
        set((state) => {
          if (!state.job) return {};
          return {
            job: {
              ...state.job,
              usingTemplate: null
            }
          };
        });
        return;
      }
      const templates = useFilterTemplateStore.getState().filterTemplates;
      const template = templates.find((item) => item.id === templateId);
      if (!template) return;
      set((state) => {
        if (!state.job) return {};
        return {
          job: {
            ...state.job,
            usingTemplate: {
              id: template.id,
              name: template.name
            },
            script: template.script
          }
        };
      });
    }
  }))
);
