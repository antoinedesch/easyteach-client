import {GenericModel} from "./generic-model";
import {Class} from "./class";
import {Skill} from "./skill";

export class LinkedSkill extends GenericModel {
  constructor(skill?: Skill) {
    super();
    this.skill = skill;
  }

  name: string;

  aClass: Class

  parent: LinkedSkill;

  skill: Skill;
}
