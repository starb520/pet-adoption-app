import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pet } from './pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  pets: Pet[] = [];
  petsListChanged = new Subject<Pet[]>();

  baseUrl = 'http://localhost:3000/api/pets';

  constructor(private http: HttpClient) {}

  fetchPets() {
    this.http.get<any[]>(this.baseUrl).subscribe({
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

  // get pet by id
  getPetById(id: string): Pet | null {
    if (!this.pets || this.pets.length === 0) return null;

    const pet = this.pets.find((p) => p.id === id);
    return pet ? { ...pet } : null; // return a copy
  }

  // add pet
  addPet(newPet: Pet) {
    if (!newPet) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>(this.baseUrl, newPet, { headers }).subscribe({
      next: (createdPet) => {
        const petObj: Pet = {
          id: createdPet._id,
          name: createdPet.name,
          type: createdPet.type,
          age: createdPet.age,
          gender: createdPet.gender,
          weight: createdPet.weight,
          breed: createdPet.breed,
          facility: createdPet.facility,
          description: createdPet.description,
          adopted: createdPet.adopted,
          imageUrl: createdPet.imageUrl,
          dateAdded: createdPet.dateAdded,
        };

        this.pets.push(petObj);
        this.pets.sort((a, b) => a.name.localeCompare(b.name));
        this.petsListChanged.next([...this.pets]);
      },
      error: (error) => {
        console.error('Error adding pet:', error);
      },
    });
  }

  // update pet
  updatePet(id: string, updatedPet: Pet) {
    if (!id || !updatedPet) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`${this.baseUrl}/${id}`, updatedPet, { headers }).subscribe({
      next: () => {
        const index = this.pets.findIndex((p) => p.id === id);
        updatedPet.id = id; // keep ID consistent
        this.pets[index] = updatedPet;

        this.pets.sort((a, b) => a.name.localeCompare(b.name));
        this.petsListChanged.next([...this.pets]);
      },
      error: (error) => {
        console.error('Error updating pet:', error);
      },
    });
  }

  // delete pet
  deletePet(id: string) {
    if (!id) return;

    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        this.pets = this.pets.filter((p) => p.id !== id);
        this.petsListChanged.next([...this.pets]);
      },
      error: (error) => {
        console.error('Error deleting pet:', error);
      },
    });
  }
}
