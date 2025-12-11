import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pet } from './pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  pets: Pet[] = [];
  petsListChanged = new Subject<Pet[]>();

  constructor(private http: HttpClient) {}

  fetchPets() {
    this.http.get<any[]>('http://localhost:3000/api/pets').subscribe({
      next: (petsData) => {
        // map _id → id
        this.pets = petsData.map((pet) => {
          return {
            id: pet._id,
            name: pet.name,
            type: pet.type,
            age: pet.age,
            gender: pet.gender,
            weight: pet.weight,
            breed: pet.breed,
            facility: pet.facility,
            description: pet.description,
            adopted: pet.adopted,
            imageUrl: pet.imageUrl,
            dateAdded: pet.dateAdded,
          } as Pet;
        });

        // sort by name
        this.pets.sort((a, b) => a.name.localeCompare(b.name));

        // test that the data is being fetched
        console.log('Fetched pets:', this.pets);

        // broadcast updated list
        this.petsListChanged.next([...this.pets]);
      },

      error: (error) => {
        console.error('Error fetching pets:', error);
      },
    });
  }
}
