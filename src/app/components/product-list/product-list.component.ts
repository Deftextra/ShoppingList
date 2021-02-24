import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ArrowClick } from 'src/app/models/arrow-click.enum';
import { ProductList } from 'src/app/models/product-list';
import { itemArrowClickService } from 'src/app/services/arrow-button.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {

  constructor(private arrowButtonService: itemArrowClickService) { }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit(): void {

    this.arrowButtonService
      .arrowClicks.subscribe(click => {
        if (click.clickValue === ArrowClick.Down &&
          click.productListId === this.products.listId) {
          const item = this.products.GetItemById(this.selectedItem);

          if (item) {
            console.log(item.Index);
            const r = item.Index % this.pageSize;
            if (r === 0 && this.pageSize + 1) {
              this.page++;
            }
          }
        }

        if (click.clickValue === ArrowClick.Up &&
          click.productListId == this.products.listId) {
          const item = this.products.GetItemById(this.selectedItem);

          if (item) {
            const r = item.Index % this.pageSize;
            const q = Math.floor(item.Index / this.pageSize) + 1;
            if (r === (this.pageSize - 1) && q === this.page - 1) {
              this.page--;
            }
          }
        }
      });

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
