export interface IFilterTemplateStore {
  filterTemplates: Array<FilterTemplate>;
  fetch: () => Promise<void>;
}
