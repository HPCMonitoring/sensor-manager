import { ISimpleModalStore } from '@interfaces/modal';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export function createSimpleModalStore() {
  return create<ISimpleModalStore>()(
    devtools((set) => ({
      isOpen: false, // Init state
      open: () => set(() => ({ isOpen: true })),
      close: () => set(() => ({ isOpen: false }))
    }))
  );
}
