import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { inflateRaw } from 'zlib';
import { ArrowClick } from '../models/arrow-click.enum';
import { ItemClickValue } from '../models/item-click-value';

@Injectable({
  providedIn: 'root'
})



export class itemArrowClickService {

  private _click: BehaviorSubject<ItemClickValue> = new BehaviorSubject({
    productListId: 0, 
    clickValue: ArrowClick.Down
  });

  public arrowClicks = this._click.asObservable();

  constructor() { }

  public arrowClick(arrowClick: ItemClickValue) {
    this._click.next(arrowClick);
  }
}



