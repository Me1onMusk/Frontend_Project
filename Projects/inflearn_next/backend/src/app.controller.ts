import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

//HTTP 요청을 받아 처리하는 컨트롤러
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user-test') //user-test로 요청 받음
  @UseGuards(AccessTokenGuard) //JWT 토큰이 있어야만 요청 가능!
  @ApiBearerAuth('access-token') //Swagger 문서에 "이건 토큰 필요함" 이라고 표시됨
  testUser(@Req() req: Request) {
    console.log(req.user); //로그인한 사용자 정보가 담겨 있음
    return 'test completed';
  }
}

//JWT 인증 흐름
//1.사용자가 로그인하면 → Access Token 발급
