import { Component, OnInit } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { AddPlacePage } from "../add-place/add-place";
import { Deal } from "../../src/models/deals";
import { PlacesService } from "../../src/services/deals";
import { PlacePage } from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Deal[] = [];

  constructor(private modalCtrl: ModalController,
              private placesService: PlacesService) {

  }

  ngOnInit() {
    this.placesService.fetchPlaces()
      .then(
        (places: Deal[]) => this.places = places
      );
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Deal, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.places = this.placesService.loadPlaces();
      }
    );
  }

}
