import { Method } from 'axios';

export interface RequestConfig {
  url: string;
  method: Method;
  headers?: Record<string, string>;
  data?: any;
}
