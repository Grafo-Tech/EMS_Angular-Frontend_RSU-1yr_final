import { Position, Gender, Skills } from './enum';

export class Employee {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  position!: Position;
  gender!: Gender;
  skills: Skills[] = []; // Can select multiple skills
}
