import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  public updatePhoto(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string | undefined
  ) {
    const url = `${base_url}/upload/${type}/${id}`;
    const formData: FormData = new FormData();
    formData.append('img', file, file.name);

    return this.http.put(url, formData, {
      headers: { 'x-token': this.token },
    });
  }
}
