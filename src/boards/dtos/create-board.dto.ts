import { IsString } from '@nestjs/class-validator';

export class CreateBoardDto {
  @IsString()
  readonly contents: string;

  @IsString()
  readonly emotion: string;
}
