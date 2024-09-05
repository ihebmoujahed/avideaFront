import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable, tap } from 'rxjs';
import { Sinistre } from '../Interface/sinistre.interface';
@Injectable({
  providedIn: 'root'
})
export class SinistreService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  addSinistre(sinistre: Sinistre): Observable<Sinistre> {
    return this.http.post<Sinistre>(`${this.baseUrl}/sinistre/addsinistre`, sinistre);
  }
  getSinistreById_Contrat(id_contrat: number): Observable<Sinistre[]> {
    return this.http.get<Sinistre[]>(`${this.baseUrl}/sinistre/${id_contrat}`);
  }
  getAllSinistre(): Observable<Sinistre[]> {
    return this.http.get<Sinistre[]>(`${this.baseUrl}/sinistre`);
  }
  getSinistreById(id_sinistre: number): Observable<Sinistre>{
    return this.http.get<Sinistre>(`${this.baseUrl}/sinistre/sinistreId/${id_sinistre}`)
  }
  deleteSinistre(id: number): Observable<Sinistre>{
    return this.http.delete<Sinistre>(`${this.baseUrl}/sinistre/deleteSinistre/${id}`);
  }
  PutSinistre(sinistre:Sinistre): Observable <Sinistre>{
    return this.http.put<Sinistre>(`${this.baseUrl}/sinistre/updateSinistre`, sinistre);
  }
  deleteSinistreByidContrat(id: number): Observable<Sinistre>{
    return this.http.delete<Sinistre>(`${this.baseUrl}/sinistre/deleteByContrat/${id}`);
  }

}
