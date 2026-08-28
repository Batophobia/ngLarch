import { Injectable, signal } from '@angular/core';
import { JOBS } from '../data/jobs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly jobs = JOBS;

  getById(id: string): Job | undefined {
    return this.jobs.find(job => job.id === id);
  }

  getAll(): Job[] {
    return this.jobs;
  }
}