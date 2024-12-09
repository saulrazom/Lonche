import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private httpService: HttpService) {}

  uploadUserFile<T>(id: string, file: File): Observable<T> {
    const endpoint = `posts/${id}`;
    const formData = new FormData();
    formData.append('file', file);

    return this.httpService.put<FormData, T>(endpoint, formData);
  }
}
