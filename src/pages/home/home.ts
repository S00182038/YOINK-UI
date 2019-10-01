import { Component, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals';
import { ModalController } from 'ionic-angular';

import { Deal } from "../../models/deals";

import { AddDealPage } from '../add-deal/add-deal';
import { DealPage } from '../deal/deal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addDealPage = AddDealPage;
  deals: Deal[] = [];

  constructor(private modalCtrl: ModalController,
    private dealsService: DealsService) {

  }

  ngOnInit() {
    this.dealsService.fetchDeals()
      .then(
        (deals: Deal[]) => this.deals = deals
      );
  }

  ionViewWillEnter() {
    this.deals = this.dealsService.loadDeals();
  }

  onOpenDeal(deal: Deal, index: number) {
    const modal = this.modalCtrl.create(DealPage, { deal: deal, index: index });
    modal.present();
    modal.onDidDismiss(
      () => {
        this.deals = this.dealsService.loadDeals();
      }
    );
  }

}
