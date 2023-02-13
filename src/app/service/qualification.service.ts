import { Injectable } from '@angular/core';
import {Qualification} from "../model/Qualification";
import {HTTPCommunicatorService} from "./httpcommunicator.service";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  private qualifications: BehaviorSubject<Qualification[]> = new BehaviorSubject<Qualification[]>([]);
  public readonly qualifications$: Observable<Qualification[]> = this.qualifications.asObservable();

  constructor(private httpCommunicatorService: HTTPCommunicatorService) {
    this.fillObservable();
  }

  async fillObservable(): Promise<void>{
    this.qualifications.next(await this.httpCommunicatorService.getQualifications());
  }

  async addQualification(qualificationName: string):Promise<void>{
    await this.httpCommunicatorService.addQualification(qualificationName);
    await this.fillObservable();
  }

  async deleteQualification(qualificationName: string):Promise<void>{
    await this.httpCommunicatorService.deleteQualification(qualificationName);
    await this.fillObservable();
  }
}
