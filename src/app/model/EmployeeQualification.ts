import {Qualification} from "./Qualification";

export class EmployeeQualification {
  constructor(public id: number,
              public lastName: string,
              public firstName: string,
              public skillSet: Qualification[] ) {
  }
}
