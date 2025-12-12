import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pet } from '../pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-detail',
  standalone: false,
  templateUrl: './pet-detail.html',
  styleUrl: './pet-detail.css',
})
export class PetDetail implements OnInit {
  pet: Pet | null = null;
  id: string | null = null;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!this.id) return;

      this.pet = this.petService.getPetById(this.id);

      if (!this.pet) {
        console.error('Pet not found');
        this.router.navigate(['/pets']);
      }
    });
  }

  onEdit() {
    this.router.navigate(['/pets', this.id, 'edit']);
  }

  onDelete() {
    if (this.id) {
      this.petService.deletePet(this.id);
    }
    this.router.navigate(['/pets']);
  }

}
