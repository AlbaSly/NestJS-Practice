import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  private brands: Brand[] = []

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;

    const brandCreated: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.unshift(brandCreated);
    
    return {
      msg: 'Brand created',
      brandCreated
    }
  }

  findAll() {
    return [...this.brands];
  }

  findOne(id: string) {
    
    const brandFound = this.brands.find(brand => brand.id === id);

    if (!brandFound) throw new NotFoundException(`Brand with id ${id} not found`);

    return brandFound;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandFound = this.findOne(id);

    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        brandFound.updatedAt = new Date().getTime();
        return Object.assign(brandFound, {...updateBrandDto});
      }

      return brand;
    });

    return {
      msg: 'Brand Updated'
    }
  }

  remove(id: string) {
    let brandFound = this.findOne(id);

    this.brands = this.brands.filter(brand => brand.id !== brandFound.id);

    return {
      msg: `Brand deleted with id ${id}`
    }
  }

  public fillBrandsWithSeedData( brands: Brand[]) { 
    this.brands = brands;
  }
}
