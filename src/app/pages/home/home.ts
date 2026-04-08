import { Component, inject, OnInit } from '@angular/core';
import { Characterlist } from '../list/characterlist';
import { Characterfilter } from '../list/characterfilter/characterfilter';
import { CharacterApi } from '../list/services/character-api';

@Component({
  selector: 'app-home',
  imports: [Characterlist, Characterfilter],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  store = inject(CharacterApi);

  ngOnInit() {
    if (this.store.characters().length === 0) {
      this.store.load();
    }
  }
}
