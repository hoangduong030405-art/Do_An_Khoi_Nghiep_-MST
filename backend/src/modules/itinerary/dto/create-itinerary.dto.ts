import { IsString, IsNotEmpty, IsArray, ArrayMaxSize, IsDateString } from 'class-validator';

export class CreateItineraryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  date: string;

  @IsArray()
  @ArrayMaxSize(12, { message: 'Một lộ trình chỉ được phép tối đa 12 địa điểm.' })
  placeIds: string[];
}
