export interface BlazeAPIResponse<T = any> {
  code: "SUCCESS" | "ERROR";
  data: T;
  message: string;
}

export type NameId<Id = string, Name = string> = {
  id: Id;
  name: Name;
};

export type BaseAPIParams<T> = T & {
  transform?: boolean;
};

export type AnyFunction = (...args: any) => any;
