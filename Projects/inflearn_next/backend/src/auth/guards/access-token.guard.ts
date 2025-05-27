import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Nest.js에서 JWT 로그인 토큰을 검사하는 가드
//보안 검사기 (로그인한 사용자만 접근 가능하게 막아주는 역할)
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access-token') {}
