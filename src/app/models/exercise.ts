import {GenericModel} from "./generic-model";
import {User} from "./user";
import {LinkedSkill} from "./linked-skill";
import {Section} from "./enums/section";

export class Exercise extends GenericModel {

  name:string;

  teacher:User;

  linkedSkills:LinkedSkill[];

  date:Date;

  section: Section;

}
