import { IFilterTemplateStore } from '@interfaces';
import { userService } from '@services';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useFilterTemplateStore = create<IFilterTemplateStore>()(
  devtools((set) => ({
    filterTemplates: [],
    fetch: async function () {
      const filterTemplates = await userService.getFilterTemplates();
      set({ filterTemplates });
    }
  }))
);
