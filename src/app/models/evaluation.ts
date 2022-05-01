import {Pupil} from "./pupil";
import {Skill} from "./skill";
import {EvaluationValue} from "./enums/evaluation-value";
import {Exercise} from "./exercise";
import {EvaluationType} from "./enums/evaluation-type";
import {LinkedSkill} from "./linked-skill";
import {GenericModel} from "./generic-model";

export class Evaluation extends GenericModel{
  pupil: Pupil;

  skill: Skill;

  linkedSkill: LinkedSkill;

  value: EvaluationValue;

  exercise:Exercise;

  score:number;

  evaluationType:EvaluationType;

  absent: boolean;

  constructor() {
    super();
    this.score = 0;
  }

}
