import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

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

  reservationForm = this.formBuilder.group({
    inputEmail: ['', [Validators.required, Validators.email]],
    inputDate: ['mm/dd/yy', [Validators.required]],
    inputHour: ['', [Validators.required]],
    inputMinute: ['', [Validators.required]]
  });

  formValidation:boolean = false;

  hourOptions: any[] = [{name: '10', value: 10}, {name: '11', value: 11}, {name: '12', value: 12}, {name: '13', value: 13}, {name: '14', value: 14}, {name: '15', value: 15}, {name: '16', value: 16}, {name: '17', value: 17}]
  minuteOptions: any[] = [{name: '00', value: 0}, {name: '15', value: 15}, {name: '30', value: 30}, {name: '45', value: 45}]

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log('detail inited');
  }

  goBack() {
    this.detail_status.emit(false);
  }


  

  onSubmit(){
    this.formValidation = true
  }
}
