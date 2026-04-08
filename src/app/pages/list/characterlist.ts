import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CharacterApi } from './services/character-api';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-characterlist',
  imports: [MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, NgClass, RouterLink],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.scss',
})
export class Characterlist {
  store = inject(CharacterApi);
}
