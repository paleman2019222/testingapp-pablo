export interface ApiRequest {
    url: string;
    method: string;
    headers: { key: string; value: string }[];
    body?: any;
  }
  