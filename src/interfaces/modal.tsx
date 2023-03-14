export interface ISimpleModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
