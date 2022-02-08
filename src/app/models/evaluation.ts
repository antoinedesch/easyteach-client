import {Pupil} from "./pupil";
import {Skill} from "./skill";
import {EvaluationValue} from "./enums/evaluation-value";
import {Exercise} from "./exercise";

export class Evaluation {
  pupil: Pupil;

  skill: Skill;

  value: EvaluationValue;

  exercise:Exercise;

  score:number;

  constructor() {
    this.score = 0;
  }

}
