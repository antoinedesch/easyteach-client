import {Profile} from "./enums/profile";
import {Person} from "./person";

export class User extends Person{

  email: string;

  profile: Profile;

}
