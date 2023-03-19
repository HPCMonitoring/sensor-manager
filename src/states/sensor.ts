import { BROKER_NOT_HAVE_TOPICS } from "@constants";
import {
  IConfigSensorModalStore,
  IConfigSensorTopicModalStore as IConfigTopicSubscriptionModalStore,
  IDeleteSensorModalStore,
  ISensorStore
} from "@interfaces";
import { sensorService } from "@services";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useFilterTemplateStore } from "./filterTemplate";
import { useKafkaBrokerStore } from "./kafkaBroker";

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
      } catch (error) {
        const sensors: SensorSummary[] = JSON.parse(JSON.stringify(get().sensors));
        const deletedSensorIdx = sensors.findIndex((sensor) => sensor.id === sensorId);
        if (deletedSensorIdx !== -1) sensors.splice(deletedSensorIdx, 1);
        set(() => ({ sensors }));
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

export const useConfigTopicSubscriptionModalStore = create<IConfigTopicSubscriptionModalStore>()(
  devtools((set, get) => ({
    topic: null,
    open: (topic) => set(() => ({ topic })),
    close: () => set(() => ({ topic: null })),
    setBroker: (brokerId) => {
      const brokers = useKafkaBrokerStore.getState().brokers;
      const broker = brokers.find((item) => item.id === brokerId);
      if (!broker) return;
      if (broker.topics.length === 0) {
        toast.warning(BROKER_NOT_HAVE_TOPICS);
        return;
      }
      set((state) => {
        if (!state.topic) return {};
        return {
          topic: {
            key: state.topic.key,
            id: broker.topics[0].id,
            name: broker.topics[0].name,
            interval: state.topic.interval,
            usingTemplate: null,
            script: "",
            broker: {
              id: broker.id,
              name: broker.name,
              url: broker.url
            }
          }
        };
      });
    },
    setInterval: (interval) => {
      set((state) => {
        if (!state.topic) return {};
        return {
          topic: {
            ...state.topic,
            interval
          }
        };
      });
    },
    setScript(script) {
      set((state) => {
        if (!state.topic) return {};
        return { topic: { ...state.topic, script } };
      });
    },
    setTopic(topicId) {
      const currData = get().topic;
      if (!currData) return;
      const topics = useKafkaBrokerStore.getState().getTopicsById(currData.broker.id);
      const topic = topics.find((item) => item.id === topicId);
      if (!topic) return;
      set((state) => {
        if (!state.topic) return {};
        return {
          topic: {
            ...state.topic,
            id: topic.id,
            name: topic.name
          }
        };
      });
    },
    setUsingTemplate(templateId) {
      const templates = useFilterTemplateStore.getState().filterTemplates;
      const template = templates.find((item) => item.id === templateId);
      if (!template) return;
      set((state) => {
        if (!state.topic) return {};
        return {
          topic: {
            ...state.topic,
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
