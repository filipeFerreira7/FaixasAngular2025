import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roteador } from '../models/roteador.model';

@Injectable({
  providedIn: 'root'
})

export class RoteadorService {
  private baseUrl: string = 'http://localhost:8080/roteadores';

  constructor(private httpClient: HttpClient) { 
  }

  findAll(): Observable<Roteador[]>{
    return this.httpClient.get<Roteador[]>(this.baseUrl);
  }

  findById(id: string): Observable<Roteador>{
    return this.httpClient.get<Roteador>(`${this.baseUrl}/${id}`);
  }

  insert(roteador: Roteador): Observable<Roteador> {
    return this.httpClient.post<Roteador>(this.baseUrl, roteador);
  }

  update(roteador: Roteador): Observable<Roteador> {
    return this.httpClient.put<Roteador>(`${this.baseUrl}/${roteador.id}`, roteador);
  }

  delete(roteador: Roteador): Observable<any> {
    return this.httpClient.delete<Roteador>(`${this.baseUrl}/${roteador.id}`);
  }

}
