import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Pet } from '../pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-list',
  standalone: false,
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})
export class PetList implements OnInit, OnDestroy {
  pets: Pet[] = [];
  private petSubscription!: Subscription;

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.petService.fetchPets();
    this.petSubscription = this.petService.petsListChanged.subscribe((pets: Pet[]) => {
      this.pets = pets;
    });
  }

  ngOnDestroy() {
    this.petSubscription.unsubscribe();
  }
}
