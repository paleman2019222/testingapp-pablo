import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms'; 
import { ApiRequest } from './interfaces/request.interface';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterOutlet]
})
export class App {

  methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  request: ApiRequest = {
    url: '',
    method: 'GET',
    headers: [
      { key: 'Content-Type', value: 'application/json' }, // predeterminado
      { key: 'Accept', value: 'application/json' }
    ],
    body: ''
  };

  response: any = null;
  status: number | null = null;
  timeMs: number | null = null;

  constructor(private api: ApiService) {}

  addHeader() {
    this.request.headers.push({ key: '', value: '' });
  }

  send() {
    const req = {
      ...this.request,
      body: this.request.body ? JSON.parse(this.request.body) : null
    };

    const start = performance.now();

    this.api.sendRequest(req).subscribe({
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
