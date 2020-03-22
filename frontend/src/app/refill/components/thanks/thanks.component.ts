import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.sass']
})
export class ThanksComponent implements OnInit {

  donator;
  constructor() { }

  ngOnInit(): void {
    this.donator = history.state.donator;
  }

}
