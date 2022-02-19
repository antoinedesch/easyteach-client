import {GenericModel} from "./generic-model";
import {Class} from "./class";

export class LinkedSkill extends GenericModel {
  name: string;

  aClass: Class

  parent: LinkedSkill;
}
