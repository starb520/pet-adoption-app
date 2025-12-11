import { Component, Input } from '@angular/core';

import { Pet } from '../pet.model';

@Component({
  selector: 'app-pet-item',
  standalone: false,
  templateUrl: './pet-item.html',
  styleUrl: './pet-item.css',
})
export class PetItem {
  @Input() pet!: Pet;

}
