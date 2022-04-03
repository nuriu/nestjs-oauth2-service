import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/user.dto';

export class LoginDto extends UserDto {
  @ApiProperty({
    description: `The value MUST be one of;
      "code" for requesting an authorization code,
      "token" for requesting an access token (implicit grant),
      or a registered extension value.`,
    required: true,
  })
  response_type: string;

  @ApiProperty({
    description: 'The client identifier.',
    required: true,
  })
  client_id: string;

  @ApiProperty({
    description: `Redirection URI that the authorization server will redirect the user-agent to.`,
    required: true,
  })
  redirect_uri: string;

  @ApiProperty({
    description: 'Type of grant.',
    required: true,
  })
  grant_type: string;
}
