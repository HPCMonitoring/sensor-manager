import {
  IConfigSensorModalStore,
  IConfigSensorSendingModalStore,
  IDeleteSensorModalStore,
  ISensorStore
} from "@interfaces";
import { sensorService } from "@services";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useFilterTemplateStore } from "./filterTemplate";
import { useKafkaBrokerStore } from "./kafkaBroker";

export const useSensorsStore = create<ISensorStore>()(
  devtools((set) => ({
    sensors: [], // Init state
    fetch: async (clusterId: string) => {
      const sensors = await sensorService.getByClusterId(clusterId);
      set(() => ({ sensors }));
    }
  }))
);

export const useConfigSensorModalStore = create<IConfigSensorModalStore>()(
  devtools((set) => ({
    sensorId: null,
    isOpen: false,
    open(sensorId) {
      set(() => ({ sensorId, isOpen: true }));
    },
    close() {
      set(() => ({ sensorId: null, isOpen: false }));
    }
  }))
);

export const useDeleteSensorModalStore = create<IDeleteSensorModalStore>()(
  devtools((set) => ({
    sensorId: null,
    isOpen: false,
    open(sensorId) {
      set(() => ({ sensorId, isOpen: true }));
    },
    close() {
      set(() => ({ sensorId: null, isOpen: false }));
    }
  }))
);

export const useConfigSensorSendingModalStore = create<IConfigSensorSendingModalStore>()(
  devtools((set, get) => ({
    topic: null,
    isOpen: false,
    open: (topic) => {
      set(() => ({ isOpen: true, topic }));
    },
    close: () => {
      set(() => ({ isOpen: false, topic: null }));
    },
    setBroker: (brokerId) => {
      const brokers = useKafkaBrokerStore.getState().brokers;
      const broker = brokers.find((item) => item.id === brokerId);
      if (!broker) return;
      set((state) => {
        if (!state.topic) return {};
        return {
          topic: {
            ...state.topic,
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
            interval: interval
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
      const topics = useKafkaBrokerStore.getState().getTopicsByBrokerId(currData?.broker.id);
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
