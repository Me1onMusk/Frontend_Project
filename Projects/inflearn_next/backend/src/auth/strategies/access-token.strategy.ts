import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//JWT 토큰 안에 들어 있는 사용자 정보의 타입
type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
};

//로그인한 사용자가 보낸 JWT 토큰을 분석해서 사용자 정보를 꺼내는 역할
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
  constructor() {
    super({
      //요청 헤더에서 Bearer 토큰을 꺼냄
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //만료된 토큰은 거절
      ignoreExpiration: false,
      //JWT 토큰을 해석할 때 사용할 비밀 키
      secretOrKey: process.env.AUTH_SECRET!,
    });
  }

  //토큰이 유효할 때 자동으로 실행
  //NestJS는 이 정보를 req.user에 넣어
  async validate(payload: JwtPayload) {
    return payload;
  }
}
