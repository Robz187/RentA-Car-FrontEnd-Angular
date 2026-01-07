import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
cars:Car[]=[];
dataLoaded:boolean = false;
imageUrl:string = "https://localhost:44388";
carFilter:string = "";
  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      const brandId = params['brandId'] ? Number(params['brandId']) : 0;
      const colorId = params['colorId'] ? Number(params['colorId']) : 0;

      if (brandId > 0 && colorId > 0) {
        this.getCarsBySelect(brandId, colorId);
      } else if (colorId > 0) {
        this.getCarsByColor(colorId);
      } else if (brandId > 0) {
        this.getCarsByBrand(brandId);
      } else {
        this.getCars();
      }
    })
    
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
 
  getCarsByBrand(brandId:number){
 
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
     
      
    })
  }

  getCarsByColor(colorId:number){

    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
     
    })
  }

  getCarsBySelect(brandId:number, colorId:number){
    this.carService.getCarsBySelect(brandId,colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  
}
