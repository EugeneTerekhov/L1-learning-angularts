export enum Action {
  ADD,
  DELETE,
  UPDATE
}

export interface ActionEvent<T> {
  action: number;
  data: T;
}
