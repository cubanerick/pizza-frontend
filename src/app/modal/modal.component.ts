import { Component, OnInit, Input, Output } from '@angular/core';
import { Order } from '../order.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: []
})

export class ModalComponent implements OnInit {

    @Input() order!: Order;
    @Input() closeModal!: Function;
  
    ngOnInit(): void {
        
    }
}