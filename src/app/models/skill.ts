import {LinkedSkill} from "./linked-skill";
import {GenericModel} from "./generic-model";
import {Objective} from "./objective";

export class Skill extends GenericModel{
  name: string;

  objective:Objective;

  linkedSkills:LinkedSkill[];

}
