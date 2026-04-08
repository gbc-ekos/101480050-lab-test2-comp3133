import { Component } from '@angular/core';
import { Characterlist } from '../list/characterlist';

@Component({
  selector: 'app-home',
  imports: [Characterlist],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
