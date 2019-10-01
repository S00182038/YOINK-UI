import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "ionic-native";

import { Deal } from "../models/deals";
import { Location } from "../models/location";

declare var cordova: any;

@Injectable()
export class DealsService {
    private deals: Deal[] = [];

    constructor(private storage: Storage) { }

    addDeal(title: string,
        description: string,
        location: Location,
        imageUrl: string) {
        const deal = new Deal(title, description, location, imageUrl);
        this.deals.push(deal);
        this.storage.set('places', this.deals)
            .then()
            .catch(
                err => {
                    this.deals.splice(this.deals.indexOf(deal), 1);
                }
            );
    }

    loadDeals() {
        return this.deals.slice();
    }

    fetchDeals() {
        return this.storage.get('deals')
            .then(
                (deals: Deal[]) => {
                    this.deals = deals != null ? deals : [];
                    return this.deals;
                }
            )
            .catch(
                err => console.log(err)
            );
    }

    deleteDeal(index: number) {
        const deal = this.deals[index];
        this.deals.splice(index, 1);
        this.storage.set('places', this.deals)
            .then(
                () => {
                    this.removeFile(deal);
                }
            )
            .catch(
                err => console.log(err)
            );
    }

    private removeFile(deal: Deal) {
        const currentName = deal.imageUrl.replace(/^.*[\\\/]/, '');
        File.removeFile(cordova.file.dataDirectory, currentName)
            .then(
                () => console.log('Removed File')
            )
            .catch(
                () => {
                    console.log('Error while removing File');
                    this.addDeal(deal.title, deal.description, deal.location, deal.imageUrl);
                }
            );
    }
}
