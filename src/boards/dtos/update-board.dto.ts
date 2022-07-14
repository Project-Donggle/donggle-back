import { IsString } from '@nestjs/class-validator';

export class UpdateBoardDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;

  @IsString()
  readonly emotion: string;
}
