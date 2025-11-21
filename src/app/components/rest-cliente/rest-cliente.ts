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
  bodyType: 'json' | 'form' = 'json';
  formFields = [
  { key: '', value: '' }
];


  constructor(private http: HttpClient) {}

  addHeader() {
    this.request.headers.push({ key: '', value: '' });
  }

send() {

  let headers = new HttpHeaders();
  this.request.headers.forEach(h => {
    if (h.key && h.value) headers = headers.set(h.key, h.value);
  });

  let body: any = null;

  if (this.request.method !== 'GET') {

    if (this.bodyType === 'json') {

      try {
        body = JSON.parse(this.request.body);
      } catch {
        alert('JSON inválido');
        return;
      }
    }

    if (this.bodyType === 'form') {
      headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

      const params = new URLSearchParams();

      this.formFields.forEach(f => {
        if (f.key) params.append(f.key, f.value);
      });

      body = params.toString();
    }
  }

  const start = performance.now();

  this.http.request(this.request.method, this.request.url, {
    body,
    headers,
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
