import {Pupil} from "./pupil";
import {Skill} from "./skill";
import {EvaluationValue} from "./enums/evaluation-value";
import {Exercise} from "./exercise";
import {EvaluationType} from "./enums/evaluation-type";

export class Evaluation {
  pupil: Pupil;

  skill: Skill;

  value: EvaluationValue;

  exercise:Exercise;

  score:number;

  evaluationType:EvaluationType;

  constructor() {
    this.score = 0;
  }

}
