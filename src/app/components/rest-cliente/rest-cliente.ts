import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-rest-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rest-cliente.html',
  styleUrls: ['./rest-cliente.css']
})
export class RestClienteComponent {

  methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  request = {
    url: '',
    method: 'GET',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' }
    ],
    body: ''
  };

  response: any = null;
  status: number | null = null;
  timeMs: number | null = null;

  constructor(private http: HttpClient) {}

  addHeader() {
    this.request.headers.push({ key: '', value: '' });
  }

  send() {
    let headers = new HttpHeaders();

    this.request.headers.forEach(h => {
      if (h.key && h.value) headers = headers.set(h.key, h.value);
    });

    let body = null;
    if (this.request.body && this.request.method !== 'GET') {
      try {
        body = JSON.parse(this.request.body);
      } catch {
        alert('El body no tiene un JSON válido');
        return;
      }
    }

    const start = performance.now();

    this.http.request(this.request.method, this.request.url, {
      headers,
      body,
      observe: 'response'
    }).subscribe({
      next: (res) => {
        this.status = res.status;
        this.timeMs = performance.now() - start;
        this.response = res.body;
      },
      error: (err) => {
        this.status = err.status || 0;
        this.timeMs = performance.now() - start;
        this.response = err.error || err.message;
      }
    });
  }
}
