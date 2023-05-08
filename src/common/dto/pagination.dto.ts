import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @IsIn(['no', 'name'])
  sort_by?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @IsIn(['asc', 'desc'])
  sort_order?: 'asc' | 'desc';
}
