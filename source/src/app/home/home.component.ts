import { Component, OnInit } from '@angular/core';
import {trigger, transition, query, style, stagger} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *',[
        query(':enter',style({opacity:0}),{optional: true})
        //query(':enter',stagger('300ms',null))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item';
  goalText: string = 'My fist life goal';
  goals = [];

  constructor(private _data: DataService) { 

  }

  ngOnInit() {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res=>this.goals = res);
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i){
    this.goals.splice(i,1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

}
