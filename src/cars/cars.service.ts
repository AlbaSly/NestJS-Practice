import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { UpdateCarDTO, CreateCarDTO } from './dtos';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {

    private cars: Car[] = []

    public findAll() {
        return [...this.cars];
    }

    public findOne(id: string) {
        const carFound = this.cars.find(car => car.id === id);
        
        if (!carFound) throw new NotFoundException(`Car with id ${id} not found`);

        return carFound;
    }

    public create(dataCreateCarDto: CreateCarDTO) {
        const newCar: Car = {
            id: uuid(),
            ...dataCreateCarDto
        }
        
        this.cars.unshift(newCar);

        return {
            msg: 'Car Added',
            newCar
        }
    }

    public update(id: string, dataUpdateCatDto: UpdateCarDTO) {
        const carFound: Car = this.findOne(id);

        this.cars = this.cars.map(car => {
            if (car.id === carFound.id) {
                return Object.assign(carFound, {...dataUpdateCatDto});
            }
            return car;
        });

        return {
            msg: 'Car data updated'
        }
    }

    public delete(id: string) {
        const carFound: Car = this.findOne(id);
        
        this.cars = this.cars.filter(car => car.id !== carFound.id);

        return {
            msg: 'Car deleted'
        }
    }

    public fillCarsWithSeedData(cars : Car[]) {
        this.cars = cars;
    }
}
