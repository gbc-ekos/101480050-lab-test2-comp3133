import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CharacterDetail {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: { wood: string; core: string; length: number };
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alive: boolean;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterDetailsApi {
  private http = inject(HttpClient);

  character = signal<CharacterDetail | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  load(id: string) {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<CharacterDetail[]>(`https://hp-api.onrender.com/api/character/${id}`).subscribe({
      next: ([char]) => {
        this.character.set(char);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load character.');
        this.loading.set(false);
      },
    });
  }
}
