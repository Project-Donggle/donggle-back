import { IsString } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  readonly nickname: string;

  @IsString()
  readonly email: string;
}
