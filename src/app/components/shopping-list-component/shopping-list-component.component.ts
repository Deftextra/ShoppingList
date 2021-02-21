import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/models/list-item';

@Component({
  selector: 'app-shopping-list-component',
  templateUrl: './shopping-list-component.component.html',
  styleUrls: ['./shopping-list-component.component.css']
})
export class ShoppingListComponentComponent implements OnInit {

  constructor() { }

  public currentItems: ListItem[] = [];
  public previousItems: ListItem[] = [];

  ngOnInit() {
    for (let index = 0; index < 20; index++) {
      let item = new ListItem();
      item.ItemName = "current item",
      this.currentItems.push(item);

    }

    for (let index = 0; index < 10; index++) {
      let item = new ListItem();
      item.ItemName = "previus item",
      this.currentItems.push(item);

    }
  }

}
