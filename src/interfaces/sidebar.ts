export interface IDarkThemeStore {
  dark: boolean;
  toggleTheme: () => void;
  loadTheme: () => void;
}

export interface IClusterExpandStore {
  isExpand: boolean;
  expand: () => void;
  collapse: () => void;
}
