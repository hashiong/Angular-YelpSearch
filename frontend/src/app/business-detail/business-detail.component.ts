import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BookingsService } from '../bookings.service';
import { ViewChild } from '@angular/core'



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
  
  @ViewChild('closeButton') closeButton:any;

  reservationForm = this.formBuilder.group({
    inputEmail: ['', [Validators.required, Validators.email]],
    inputDate: ['mm/dd/yy', [Validators.required]],
    inputHour: ['', [Validators.required]],
    inputMinute: ['', [Validators.required]]
  });

  formValidation:boolean = false;

  hourOptions: any[] = [{name: '10', value: 10}, {name: '11', value: 11}, {name: '12', value: 12}, {name: '13', value: 13}, {name: '14', value: 14}, {name: '15', value: 15}, {name: '16', value: 16}, {name: '17', value: 17}]
  minuteOptions: any[] = [{name: '00', value: 0}, {name: '15', value: 15}, {name: '30', value: 30}, {name: '45', value: 45}]
  booked:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookingsService
  ) {}

  ngOnInit(): void {
    this.booked = this.isBookingExist(this.details.name)
  }

  goBack() {
    this.detail_status.emit(false);
  }

  isBookingExist(name:string){
    return this.bookService.existBooking(name)
  }

  deleteBooking(name:string){
    this.bookService.removeFromBookings(name)
    this.booked = false;
    alert("Reservation cancelled!")
  }
  

  onSubmit(){
    this.formValidation = true
    if(this.reservationForm.valid){
      let email = this.reservationForm.controls.inputEmail.value || "";
      let date = this.reservationForm.controls.inputDate.value || "";
      let time = this.reservationForm.controls.inputHour.value + ":" + this.reservationForm.controls.inputMinute.value
      this.bookService.addToBookings(this.details.name, date, time, email)
      this.booked = true;
      this.closeButton.nativeElement.click();
      alert("Reservation created!")
    }
    else{
      console.log("Retry")
    }
    
  }
}
