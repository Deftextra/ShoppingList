import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from 'src/app/models/list-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  @Input()
  public products: ListItem[];

  @Input()
  public header: string;

  public pageSize: number = 10;
  public page: number;


  constructor() { }

  ngOnInit() {
    this.page = 1;
  }

}
