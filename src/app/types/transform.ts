export interface TransformModel<T, R = any> {
  transformToModel(data: R): T;
  transformFromModel(model: T): R;
}
