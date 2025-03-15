import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private baseUrl: string = 'http://localhost:8080/estados';

  constructor(private httpClient: HttpClient) { 
  }

  getEstados(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(this.baseUrl);
  }

  salvar(estado:Estado): Observable<Estado>{
    return this.httpClient.post<Estado>(this.baseUrl, estado);
  }

  findAll(): Observable<Estado[]>{
    return this.httpClient.get<Estado[]>(this.baseUrl);
  }

  findById(id: string): Observable<Estado>{
    return this.httpClient.get<Estado>(`${this.baseUrl}/${id}`);
  }

  update(estado:Estado): Observable<Estado>{
    return this.httpClient.put<Estado>(`${this.baseUrl}/${estado.id}`,estado);
  }

  delete(estado:Estado): Observable<Estado>{
    return this.httpClient.delete<Estado>(`${this.baseUrl}/${estado.id}`);
  }

}
