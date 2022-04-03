import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Username of the user.',
  })
  username: string;
  @ApiProperty({
    description: 'Password of the user.',
  })
  password: string;
}
