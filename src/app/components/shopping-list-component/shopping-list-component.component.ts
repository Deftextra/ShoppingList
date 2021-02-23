import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFormValue } from 'src/app/models/add-form-value';
import { ArrowClick } from 'src/app/models/arrow-click.enum';
import { ProductList } from 'src/app/models/product-list';
import { itemArrowClickService } from 'src/app/services/arrow-button.service';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';

@Component({
  selector: 'app-shopping-list-component',
  templateUrl: './shopping-list-component.component.html',
  styleUrls: ['./shopping-list-component.component.css']
})
export class ShoppingListComponentComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private arrowButtonService: itemArrowClickService) { }

  ngOnInit() {
    // TODO refactor and move to a service
    this.currentItems = ProductList.Create();
    this.previousItems = ProductList.Create();

    for (let index = 0; index < 20; index++) {
      this.currentItems.addItem(`current ${index}`);
    }

    for (let index = 0; index < 10; index++) {
      this.previousItems.addItem(`previous ${index}`);
    }
  }


  public closeResult: string;

  public currentItems: ProductList;

  public previousItems: ProductList;

  public selectedCurrentItemId: number;

  public selectedPreviousItemId: number;

  public previousItemSelected(item: number) {
    this.selectedPreviousItemId = item;

    if (this.selectedCurrentItemId || this.selectedCurrentItemId == 0) {
      this.selectedCurrentItemId = null;
    }
  }

  public currentItemSelected(item: number) {
    this.selectedCurrentItemId = item;

    if (this.selectedPreviousItemId || this.selectedPreviousItemId == 0) {
      this.selectedPreviousItemId = null;
    }
  }

  public moveSIFromCurrentToPrevious() {

    if (this.selectedCurrentItemId && !this.selectedPreviousItemId) {
      let deleteItem = this.currentItems.DeleteProduct(this.selectedCurrentItemId);

      if (deleteItem) {
        this.previousItems.addExistingItem(deleteItem);
      }
      this.selectedCurrentItemId = null;
    }

    // TODO: maybe out at service with shows warning.
  }

  public moveSIFromPreviousToCurrent() {
    if (this.selectedPreviousItemId && !this.selectedCurrentItemId) {
      let deleteItem = this.previousItems.DeleteProduct(this.selectedPreviousItemId);

      if (deleteItem) {
        this.currentItems.addExistingItem(deleteItem);
      }
      this.selectedPreviousItemId = null;
    }
    // TODO : maybe add  service which shows warning.
  }

  openModalFormforDelete() {

    const modalRef = this.modalService.open(AddItemFormComponent);

    modalRef.componentInstance.isDelete = true;

    if (this.selectedPreviousItemId) {
      modalRef.componentInstance.deleteItemName = this.previousItems
        .GetItemById(this.selectedPreviousItemId).ItemName;
    }


    modalRef.result.then((goAhead: boolean) => {
      if (goAhead) {
        if (this.selectedPreviousItemId && !this.selectedCurrentItemId) {
          this.previousItems.DeleteProduct(this.selectedPreviousItemId);
          this.selectedPreviousItemId = null;
        }
      }
    })
      .catch((error) => console.log(error));

  }

  openModalFormForAdd() {
    const modalRef = this.modalService.open(AddItemFormComponent);

    modalRef.componentInstance.isAdd = true;

    modalRef.result.then((result: AddFormValue) => {
      this.currentItems.addItem(result.itemName, result.itemPriority);
    })
      .catch((error) => console.log(error))

  }

  // TODO: Refactor this mmethod.
  openModalFormForEdit() {
    if (!this.selectedCurrentItemId && !this.selectedPreviousItemId) {
      // TODO: Create message service (must select item first before edting)
      return;
    }

    const modalRef = this.modalService.open(AddItemFormComponent);

    modalRef.componentInstance.isEdit = true;

    if (this.selectedCurrentItemId) {
      const item = this.currentItems.GetItemById(this.selectedCurrentItemId);

      modalRef.componentInstance.editItemName = item.ItemName;
      modalRef.componentInstance.editItemPriority = item.HighPriority;

      modalRef.result.then((result: AddFormValue) => {
        this.currentItems.EditProduct(this.selectedCurrentItemId, result.itemName, result.itemPriority);
      })
        .catch((error) => console.log(error))
    }

    if (this.selectedPreviousItemId) {
      const item = this.previousItems.GetItemById(this.selectedPreviousItemId);

      modalRef.componentInstance.editItemName = item.ItemName;
      modalRef.componentInstance.editItemPriority = item.ItemName;

      modalRef.result.then((result: AddFormValue) => {
        this.previousItems.EditProduct(this.selectedPreviousItemId, result.itemName, result.itemPriority);
      })
        .catch((error) => console.log(error))

    }
  }

  // Refactor this code.
  public moveSelectedItemUp() {
    if (this.selectedCurrentItemId) {
      this.currentItems.moveItemUp(this.selectedCurrentItemId);
      this.arrowButtonService.arrowClick({
        productListId: this.currentItems.listId,
        clickValue: ArrowClick.Up
      });
    }

    if (this.selectedPreviousItemId) {
      this.previousItems.moveItemUp(this.selectedPreviousItemId);
      this.arrowButtonService.arrowClick({
        productListId: this.previousItems.listId,
        clickValue: ArrowClick.Up
      });
    }
  }

  public moveSelectedItemDown() {
    if (this.selectedCurrentItemId) {
      this.currentItems.moveItemDown(this.selectedCurrentItemId);
      this.arrowButtonService.arrowClick({
        productListId: this.currentItems.listId,
        clickValue: ArrowClick.Down
      });
    }

    if (this.selectedPreviousItemId) {
      this.previousItems.moveItemDown(this.selectedPreviousItemId);
      this.arrowButtonService.arrowClick({
        productListId: this.previousItems.listId,
        clickValue: ArrowClick.Down
      });
    }
  }

  o
}
