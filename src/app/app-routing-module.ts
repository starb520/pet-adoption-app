import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pets } from './pets/pets';
import { PetEdit } from './pets/pet-edit/pet-edit';
import { PetDetail } from './pets/pet-detail/pet-detail';

const routes: Routes = [
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  { path: 'pets', component: Pets, children: [
      { path: 'new', component: PetEdit },
      { path: ':id', component: PetDetail },
      { path: ':id/edit', component: PetEdit },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
