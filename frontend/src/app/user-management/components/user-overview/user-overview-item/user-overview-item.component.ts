import { Component, OnInit, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-overview-item',
  templateUrl: './user-overview-item.component.html',
  styleUrls: ['./user-overview-item.component.sass']
})
export class UserOverviewItemComponent implements OnInit {

  constructor() { }
  @Input() user;

  roles: any[] = [
    {
      name: 'admin',
      id: 'dasdd7d9i9'
    },
    {
      name: 'employee',
      id: '23456hnml'
    },
    {
      name: 'support',
      id: 'dasdasdasd8u'
    }
  ];
  chipControl = new FormControl(new Set());

  ngOnInit() {
    this.user.role.push({
      name: 'admin',
      id: 'dasdd7d9i9'
    });
    this.user.role.forEach(element => {
      this.chips.add(element.id);
    });
  }

  toggleChip = (chip: any) => {
    this.chips.has(chip) ? this.chips.delete(chip) : this.chips.add(chip);
  }

  get chips() { return this.chipControl.value; }
}
