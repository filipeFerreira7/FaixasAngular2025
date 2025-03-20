import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseUrl: string = 'http://localhost:8080/cidades';

  constructor(private httpClient: HttpClient) { 
  }

  getCidades(): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(this.baseUrl);
  }

  salvar(cidade:Cidade): Observable<Cidade>{
    return this.httpClient.post<Cidade>(this.baseUrl, cidade);
  }

  findAll(): Observable<Cidade[]>{
    return this.httpClient.get<Cidade[]>(this.baseUrl);
  }

  findById(id: string): Observable<Cidade>{
    return this.httpClient.get<Cidade>(`${this.baseUrl}/${id}`);
  }

  update(cidade:Cidade): Observable<Cidade>{
    return this.httpClient.put<Cidade>(`${this.baseUrl}/${cidade.id}`,cidade);
  }

  delete(cidade:Cidade): Observable<Cidade>{
    return this.httpClient.delete<Cidade>(`${this.baseUrl}/${cidade.id}`);
  }

}
