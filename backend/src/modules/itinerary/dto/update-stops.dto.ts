import { IsArray, ArrayMaxSize, IsString } from 'class-validator';

export class UpdateStopsDto {
  @IsArray()
  @ArrayMaxSize(12, { message: 'Một lộ trình chỉ được phép tối đa 12 địa điểm.' })
  @IsString({ each: true })
  placeIds: string[];
}
