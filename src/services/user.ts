import { server } from "./server";

export const userService = {
  getFilterTemplates: async function (): Promise<FilterTemplate[]> {
    const response = await server.get("/user/filter-templates");
    return response.data;
  },
  getKafkaBrokers: async function (): Promise<KafkaBroker[]> {
    const response = await server.get("/user/brokers");
    return response.data;
  }
};
