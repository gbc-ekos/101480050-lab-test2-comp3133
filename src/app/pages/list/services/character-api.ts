import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';

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

  private _characters = signal<Character[]>([]);
  private _houseCharacters = signal<Character[]>([]);
  characters = signal<Character[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  uniqueHouses = computed(() =>
    [...new Set(this._characters().map(c => c.house).filter(Boolean))].sort()
  );

  constructor(private http: HttpClient) {}

  list(house?: string) {
    const url = house ? `${this.baseUrl}/house/${house}` : this.baseUrl;
    return this.http.get<Character[]>(url);
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.list().subscribe({
      next: (chars) => {
        this._characters.set(chars);
        this._houseCharacters.set(chars);
        this.characters.set(chars);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load characters');
        this.loading.set(false);
      },
    });
  }

  filterByName(query: string) {
    const q = query.trim().toLowerCase();
    this.characters.set(
      q ? this._houseCharacters().filter(c => c.name.toLowerCase().includes(q)) : [...this._houseCharacters()]
    );
  }

  filterByHouse(house: string) {
    if (!house) {
      const all = [...this._characters()];
      this._houseCharacters.set(all);
      this.characters.set(all);
    } else if (house === '__no_house__') {
      const noHouse = this._characters().filter(c => !c.house);
      this._houseCharacters.set(noHouse);
      this.characters.set(noHouse);
    } else {
      this.loading.set(true);
      this.error.set(null);
      this.list(house).subscribe({
        next: (chars) => {
          this._houseCharacters.set(chars);
          this.characters.set(chars);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load characters');
          this.loading.set(false);
        },
      });
    }
  }
}
