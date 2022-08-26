import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, ValidationPipe, UsePipes } from '@nestjs/common';

import { CarsService } from './cars.service';
import { UpdateCarDTO, CreateCarDTO } from './dtos';

@Controller('cars')
// @UsePipes(ValidationPipe) //Pipe a nivel de controlador
export class CarsController {
    public constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.findOne(id);
    }

    @Post()
    // @UsePipes( ValidationPipe) Pipe a nivel de método de controlador
    createCar(@Body() createCarDto: CreateCarDTO) {
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(
            @Param('id', ParseUUIDPipe) id: string, 
            @Body() updateCarDto: UpdateCarDTO) 
        {
        return this.carsService.update(id, updateCarDto);
    }

    //@Delete(':id/:user') //Eliminar un id de acuerdo al usuario
    @Delete(':id')
    deleteCar(@Param('id') id: string) {
        return this.carsService.delete(id);
    }
}
