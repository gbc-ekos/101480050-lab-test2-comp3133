import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterDetailsApi } from './services/character-details-api';

@Component({
  selector: 'app-characterdetails',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.scss',
})
export class Characterdetails implements OnInit {
  store = inject(CharacterDetailsApi);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.load(id);
  }
}
