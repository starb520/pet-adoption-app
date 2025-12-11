import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header';
import { Pets } from './pets/pets';
import { PetList } from './pets/pet-list/pet-list';
import { PetItem } from './pets/pet-item/pet-item';
import { PetEdit } from './pets/pet-edit/pet-edit';
import { PetDetail } from './pets/pet-detail/pet-detail';


@NgModule({
  declarations: [
    App,
    Header,
    Pets,
    PetList,
    PetItem,
    PetEdit,
    PetDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
