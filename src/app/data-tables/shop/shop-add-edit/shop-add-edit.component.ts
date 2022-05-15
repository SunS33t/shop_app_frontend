import { ENTER } from '@angular/cdk/keycodes';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-shop-add-edit',
  templateUrl: './shop-add-edit.component.html',
  styleUrls: ['./shop-add-edit.component.css']
})
export class ShopAddEditComponent implements OnInit {
  shopList$!: Observable<any[]>;
  adressList$!: Observable<any>;
  adressLists: any = [];


  separatorKeysCodes: number[] = [ENTER];  // *Клавиши для добавления нового значения
  fruitCtrl = new FormControl();    // * Форма с инпутом для текста
  filteredFruits: Observable<string[]>;  //* Отфильтрованный дроп лист с учетом значения в formCtrl
  fruits: string[] = [];  //* Список значений чипсов
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];  //* Список всех возможных значений


  @Input() shop: any;
  shopName:string="";
  
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;


  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  ngOnInit(): void {
    
  }

  addShop(){

  }

  updateShop(){

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value && this.allFruits.includes(value)) {
      this.fruits.push(value);
      this.allFruits = this.allFruits.filter(x => x != value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
    this.allFruits.push(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
    this.fruitCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.allFruits = this.allFruits.filter(x=> x != event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  check(){
    console.log(this.fruits)
  }

}
