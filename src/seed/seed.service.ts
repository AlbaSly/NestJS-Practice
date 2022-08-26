import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRANDS_SEED } from './data/brands.seed';
import { CARS_SEED } from './data/cars.seed';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly carsServivce: CarsService, 
    private readonly brandService: BrandsService) {}

  populateDB() {
    this.carsServivce.fillCarsWithSeedData(CARS_SEED);
    this.brandService.fillBrandsWithSeedData(BRANDS_SEED);

    return {
      msg: 'Seeders executed successfully'
    }
  }
}
