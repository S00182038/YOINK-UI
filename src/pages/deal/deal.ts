import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Deal } from "../../models/deals";
import { DealsService } from "../../services/deals";

@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html'
})
export class DealPage {
  deal: Deal;
  index: number;

  constructor(public navParams: NavParams,
    private viewCtrl: ViewController,
    private dealsService: DealsService) {
    this.deal = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete() {
    this.dealsService.deleteDeal(this.index);
    this.onLeave();
  }
}
