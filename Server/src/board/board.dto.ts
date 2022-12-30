import { IsString, MaxLength } from 'class-validator';

export class BoardDto {
  @IsString()
  id: string;
  @IsString()
  @MaxLength(100)
  name: string;
  @IsString()
  @MaxLength(15)
  state: string;
}
