import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Character {
  id: string,
  name: string,
  alternate_names: string[],
  house: string,
  actor: string,
  alive: boolean
  image: string
} 

@Injectable({
  providedIn: 'root',
})
export class CharacterApi {
  private readonly baseUrl = 'https://hp-api.onrender.com/api/characters';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Character[]>(this.baseUrl);
  }
}

