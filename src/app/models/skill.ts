import {Subject} from "./enums/Subject";
import {LinkedSkill} from "./linked-skill";

export class Skill {
  name: string;

  subject:Subject;

  linkedSkills:LinkedSkill[];

}
