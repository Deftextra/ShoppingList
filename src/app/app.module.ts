import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponentComponent } from './components/shopping-list-component/shopping-list-component.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponentComponent,
    ProductListComponent,
    AddItemFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddItemFormComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
