import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCarDTO {
    
    @IsString({message: 'The brand field must be a string'})
    @MaxLength(16)
    readonly brand: string;
    
    @IsString({message: 'The model field must be a string'})
    readonly model: string;
}

export class UpdateCarDTO {

    // @IsString()
    // @IsUUID()
    // @IsOptional()
    // readonly id?: string
    
    @IsString()
    @MaxLength(16)
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @IsOptional()
    readonly model?: string;
}