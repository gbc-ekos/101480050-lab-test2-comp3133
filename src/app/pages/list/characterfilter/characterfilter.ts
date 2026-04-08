import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CharacterApi } from '../services/character-api';

@Component({
  selector: 'app-characterfilter',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.scss',
})
export class Characterfilter implements OnInit, OnDestroy {
  @Input() options: string[] = [];

  store = inject(CharacterApi);
  search = new FormControl('');
  houseControl = new FormControl('');
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(val => this.store.filterByName(val ?? ''));
  }

  onHouseChange(house: string) {
    this.search.setValue('', { emitEvent: false });
    this.store.filterByHouse(house);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
