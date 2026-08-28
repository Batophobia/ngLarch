import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-lab',
  imports: [],
  templateUrl: './lab.html',
  styleUrl: './lab.css',
})
export class Lab {
  research = signal(0)
  money = signal(0)

  addResearch() {
    this.research.update(cur => cur + 1)
  }
  addMoney() {
    this.money.update(cur => cur + 1)
  }
}
