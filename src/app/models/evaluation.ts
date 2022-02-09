import {Pupil} from "./pupil";
import {Skill} from "./skill";
import {EvaluationValue} from "./enums/evaluation-value";
import {Exercise} from "./exercise";
import {EvaluationType} from "./enums/evaluation-type";
import {LinkedSkill} from "./linked-skill";

export class Evaluation {
  pupil: Pupil;

  skill: Skill;

  linkedSkill: LinkedSkill;

  value: EvaluationValue;

  exercise:Exercise;

  score:number;

  evaluationType:EvaluationType;

  constructor() {
    this.score = 0;
  }

}
