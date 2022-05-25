import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrdersService } from 'src/app/orders.service';
import { OrderResponse } from 'src/app/order-response.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  providers: []
})
export class OrdersComponent implements OnInit {
    constructor(private ordersService: OrdersService) {}

    orders: Array<OrderResponse> = [{} as OrderResponse];
    filterGroup!: FormGroup;

    crusts = [
        {name: 'All'},
        {name: 'Original'},
        {name: 'Thin'},
        {name: 'Stuffed'}
    ]
    
    flavors = [
        {name: 'All'},
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
        {name: 'All'},
        {name: 'Small'},
        {name: 'Medium'},
        {name: 'Large'},
        {name: 'Xtra Large'}
    ]

    tables = [
        {name: 'All'},
        {name: '0'},
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
        {name: '6'},
        {name: '7'},
        {name: '8'},
        {name: '9'},
        {name: '10'},
        {name: '11'},
        {name: '12'},
        {name: '13'},
        {name: '14'},
        {name: '15'},
    ]

    ngOnInit(): void {
        this.initForm();
        this.getOrders().then(async orders => {
            this.orders = await JSON.parse(JSON.stringify(orders));
        });
    }

    async getOrders() {
        let orders = lastValueFrom(this.ordersService.getOrders());
        return orders;
    }

    deletePizzaOrder(id: string) {
        let accessToken = localStorage.getItem('access_token');
        this.ordersService.deleteOrder(id, accessToken ? accessToken : '')
        .subscribe( res => {
            console.log(res);
            location.href = '/orders';
        })
    }

    filterOrders() {
        this.getOrders().then(async orders => {
            this.orders = await JSON.parse(JSON.stringify(orders));
            let newOrders = this.orders.filter(order =>{
                if (this.filterGroup.value.crustControl.name === 'All') {
                    return order;
                } else {
                    return order.Crust === this.filterGroup.value.crustControl.name;
                }
            })
            .filter(order =>{
                if (this.filterGroup.value.flavorControl.name === 'All') {
                    return order;
                } else {
                    return order.Flavor === this.filterGroup.value.flavorControl.name;
                }
            })
            .filter(order =>{
                if (this.filterGroup.value.sizeControl.name === 'All') {
                    return order;
                } else {
                    return order.Size === this.filterGroup.value.sizeControl.name;
                }
            })
            .filter(order =>{
                if (this.filterGroup.value.tableNumberControl.name === 'All') {
                    return order;
                } else {
                    return order.Table_No == parseInt(this.filterGroup.value.tableNumberControl.name);
                }
            });
    
            this.orders = newOrders;
        });
    }

    private initForm() {
        this.filterGroup = new FormGroup({
          crustControl: new FormControl(this.crusts[0]),
          flavorControl: new FormControl(this.flavors[0]),
          sizeControl: new FormControl(this.sizes[0]),
          tableNumberControl: new FormControl(this.tables[0])
        });
      }
}