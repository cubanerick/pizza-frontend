import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/app/order.interface';
import { OrdersService } from 'src/app/orders.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  providers: [OrdersService]
})
export class ShopComponent implements OnInit {
  constructor(private ordersService: OrdersService) { 
  }
  pizzaOrderGroup!: FormGroup;
  displayModal = false;
  newOrder!: Order;

  crusts = [
    {name: 'Original'},
    {name: 'Thin'},
    {name: 'Stuffed'}
  ]

  flavors = [
    {name: 'Cheese'},
    {name: 'Veggie'},
    {name: 'Meat'},
    {name: 'Supreme'},
    {name: 'Margherita'},
    {name: 'BBQ Chicken'},
    {name: 'Hawaiian'},
    {name: 'Pepperoni'},
  ]

  sizes = [
    {name: 'Small'},
    {name: 'Medium'},
    {name: 'Large'},
    {name: 'Xtra Large'}
  ]

  ngOnInit(): void {
    this.initForm();
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(): void {
    this.displayModal = false;
  }

  openModal(): void {
    this.displayModal = true;
  }

  submitOrder(): void {
    let newOrder: Order = {
      Crust: this.pizzaOrderGroup.value.crustControl.name,
      Flavor: this.pizzaOrderGroup.value.flavorControl.name,
      Size: this.pizzaOrderGroup.value.sizeControl.name,
      Table_No: this.pizzaOrderGroup.value.tableNumberControl
    };

    console.log(newOrder);
    
    let accessToken = localStorage.getItem('access_token') ;
    this.ordersService.createOrder(newOrder, accessToken ? accessToken : '')
    .subscribe( res =>{
      if(res) {
        this.newOrder = JSON.parse(JSON.stringify(res));
        this.openModal();
      }
    })
  }

  private initForm() {
    this.pizzaOrderGroup = new FormGroup({
      crustControl: new FormControl(this.crusts[0]),
      flavorControl: new FormControl(this.flavors[0]),
      sizeControl: new FormControl(this.sizes[0]),
      tableNumberControl: new FormControl(0)
    });
  }
}