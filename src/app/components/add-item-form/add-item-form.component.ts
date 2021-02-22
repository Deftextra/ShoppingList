import { BoundElementProperty } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormType } from 'src/app/models/form-type.enum';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }


  @Input()
  isEdit: boolean = false;
  @Input()
  isDelete: boolean = false;
  @Input()
  isAdd: boolean = false;

  @Input()
  editItemName: string;
  @Input()
  editItemPriority: string;

  public addForm: FormGroup;

  private createForm() {
    debugger;
    if (this.isEdit) {
      this.addForm = this.formBuilder.group({
        itemName: this.editItemName,
        itemPriority: this.editItemPriority
      })
      return
    }

    if (this.isAdd) {

    this.addForm = this.formBuilder.group({
      itemName: '',
      itemPriority: false
    })

    }
  }

  public submitForm() {
    if (this.isAdd || this.isEdit)
      this.activeModal.close(this.addForm.value);

  }

  public deleteItem() {
    this.activeModal.close(true)
  }

  ngOnInit() {
    this.createForm()
  }
}
