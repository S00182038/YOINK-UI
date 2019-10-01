import { Location } from "./location";

export class Deal {
  constructor(public title: string,
              public description: string,
              public location: Location,
              public imageUrl: string) {
  }
}
