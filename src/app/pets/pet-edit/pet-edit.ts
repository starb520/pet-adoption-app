import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Pet } from '../pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-edit',
  standalone: false,
  templateUrl: './pet-edit.html',
  styleUrl: './pet-edit.css',
})
export class PetEdit implements OnInit {
  originalPet: Pet | null = null;
  pet: Pet | null = null;
  editMode: boolean = false;
  id: string | null = null;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.id = params.get('id');
      if (this.id === null) {
        this.editMode = false;
        return;
      }

      this.originalPet = this.petService.getPetById(this.id);

      if (!this.originalPet) {
        return; // invalid ID
      }

      this.editMode = true;

      // deep clone so we don't modify the original
      this.pet = JSON.parse(JSON.stringify(this.originalPet));
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const value = form.value;

    const newPet: Pet = {
      id: this.editMode ? this.id! : '', // placeholder; backend will assign id
      name: value.name,
      type: value.type,
      age: value.age,
      gender: value.gender,
      weight: value.weight,
      breed: value.breed,
      facility: value.facility,
      description: value.description,
      adopted: value.adopted ?? false,
      imageUrl: value.imageUrl,
      dateAdded: this.editMode ? this.originalPet!.dateAdded : new Date(),
    };

    if (this.editMode) {
      this.petService.updatePet(this.id!, newPet);
    } else {
      this.petService.addPet(newPet);
    }

    this.router.navigate(['/pets']);
  }

  onCancel() {
    this.router.navigate(['/pets']);
  }

}
