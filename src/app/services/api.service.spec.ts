import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiRequest } from '../interfaces/request.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {}

  sendRequest(req: ApiRequest) {
    let headers = new HttpHeaders();

    req.headers.forEach(h => {
      if (h.key && h.value) headers = headers.set(h.key, h.value);
    });

    const start = performance.now();

    return this.http.request(req.method, req.url, {
      headers,
      body: req.body || null,
      observe: 'response'
    });
  }
}
