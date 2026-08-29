import { Injectable } from '@angular/core';
import { JOBS } from '../data/jobs';
import { Job } from '../models/job';
import { PokemonType } from '../models/poke-type';

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

  getEligibleJobs(types: PokemonType[]): Job[] {
    return this.jobs.filter(job =>
      job.allowedTypes.some(type => types.includes(type))
    );
  }
}