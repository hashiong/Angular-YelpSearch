import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css'],
})
export class BusinessDetailComponent implements OnInit {
  @Input() id: string = '';
  @Input() details: any = [];
  @Input() reviews: any = [];
  @Output() detail_status = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    console.log('detail inited');
  }

  goBack() {
    this.detail_status.emit(false);
  }
}
