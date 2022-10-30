import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

  id: String | undefined;
  details: boolean = false;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    console.log("detail inited")
    this.getID();
  }

  getID(): void{
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log("Detail! " + this.id)
  }

  goBack(){
    
  }

}
