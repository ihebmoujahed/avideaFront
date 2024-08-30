import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Photo } from '../Interface/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  addPhotosinistre(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/photo/addPhotoSinistre`, formData, { responseType: 'text' as 'json' });
  }

  getPhotosBySinistre(id_sinistre: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}/photo/getPhotosBySinistre?id_sinistre=${id_sinistre}`);
  }

  getPhotoById(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/photo/photo/${id}`, { responseType: 'blob' });
  }
  deletePhoto(id: number): Observable<Photo>{
    return this.http.delete<Photo>(`${this.baseUrl}/photo/deletePhoto/${id}`,{ responseType: 'text' as 'json' })
  }
  deletePhotoByidsinistre(id : number):Observable<Photo>{
    return this.http.delete<Photo>(`${this.baseUrl}/photo/DeletePhotoByidSinistre/${id}`)
  }
}
