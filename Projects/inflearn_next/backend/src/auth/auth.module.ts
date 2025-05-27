import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  //인증 기능을 Nest.js에서 사용할 수 있게 함. (문지기)
  //JWT 토큰 관련 기능을 사용할 수 있게 함. (입장권-토큰)
  imports: [PassportModule, JwtModule.register({})],
  //JWT 토큰을 검사하는 전략을 등록함. (입장권 검사)
  providers: [AccessTokenStrategy],
})

//로그인한 사용자 인증 처리를 위한 모듈
export class AuthModule {}
