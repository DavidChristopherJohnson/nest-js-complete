import  {IsEmail, IsString, IsNumber, Min, Max, IsLongitude, IsLatitude, min} from "class-validator";

export class CreateReportDto
{
    @IsString()
    make: string

    @IsString()
    model: string

    @IsNumber()
    @Min(1930)
    @Max(new Date().getFullYear())
    year: number

    @IsNumber()
    @Min(0)
    @Max(999999)
    mileage: number

    @IsNumber()
    @IsLongitude()
    lng: number
    
    @IsNumber()
    @IsLatitude()
    lat: number

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number
}