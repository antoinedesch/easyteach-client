import {Pupil} from "./pupil";
import {Evaluation} from "./evaluation";
import {GenericModel} from "./generic-model";

export class EvaluationPupil extends GenericModel{
  pupil:Pupil;

  evaluation:Evaluation;
}
