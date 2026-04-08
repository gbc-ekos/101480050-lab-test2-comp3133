import { Component, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Character, CharacterApi } from './services/character-api';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-characterlist',
  imports: [MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, NgClass],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.scss',
})
export class Characterlist implements OnInit {
  private api = inject(CharacterApi);
  characters = signal<Character[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.api.list().subscribe({
      next: (characters) => {
        this.characters.set(characters);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load characters');
        this.loading.set(false);
      },
    });
  }

}
