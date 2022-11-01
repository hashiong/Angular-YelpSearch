import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

  @Input() id:string = "";
  @Input() details:any = [];
  @Input() reviews:any = [];

 
  
  constructor() { }

  ngOnInit(): void {
    console.log("detail inited")
  }



  goBack(){
    
  }

}
