import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  fruitForm:Fruits={
    id:0,
    name:'',
    price:0,
    quantity:0
  };

  constructor(private fruitService:FruitsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe((param)=>{
    var id=Number(param.get('id'));
    this.getById(id);

    
  })
  }
  getById(id:number){
    this.fruitService.getByID(id).subscribe((data)=>{
      this.fruitForm=data
    })
  }
  update(){
    this.fruitService.update(this.fruitForm).subscribe({
      next:(data)=>{
        this.router.navigate(["/fruits/home"]);
      },
      error:(error)=>{
        console.log(error);
        
      }
    })

  }
}
