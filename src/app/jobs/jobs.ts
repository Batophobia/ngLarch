import { Component, inject } from '@angular/core';
import { GameService } from '../services/game';
import { JobService } from '../services/job';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css'
})
export class Jobs {
  readonly game = inject(GameService);
  readonly jobService = inject(JobService);
}