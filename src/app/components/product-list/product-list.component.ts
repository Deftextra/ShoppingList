import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ProductList } from 'src/app/models/product-list';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ngOnInit(): void {
  }

  @Input()
  selectedItem: number;
  @Output()
  changeSelectedItem = new EventEmitter<number>();

  @Input()
  public products: ProductList;

  @Input()
  public header: string;


  public pageSize: number = 10;
  public page: number = 1; 

  public selectItem(itemId: number): void {
    this.selectedItem = itemId;
    this.changeSelectedItem.emit(itemId);

  }
}
