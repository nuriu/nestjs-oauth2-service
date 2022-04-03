import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
    required: false,
  })
  redirect_uri: string;

  @ApiProperty({
    description: 'The scope of the access request.',
    required: false,
  })
  scope: string;

  @ApiProperty({
    description:
      'An opaque value used by the client to maintain state between the request and callback.',
    required: false,
  })
  state: string;
}
