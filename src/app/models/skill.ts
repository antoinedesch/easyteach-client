import {Subject} from "./enums/Subject";
import {LinkedSkill} from "./linked-skill";
import {GenericModel} from "./generic-model";

export class Skill extends GenericModel{
  name: string;

  subject:Subject;

  linkedSkills:LinkedSkill[];

}
