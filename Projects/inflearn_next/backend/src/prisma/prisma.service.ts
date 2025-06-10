import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//이 클래스가 의존성 주입 대상
@Injectable()
//OnModuleInit : NestJS가 이 모듈을 초기화할 때 실행할 수 있는 함수 인터페이스
//PrismaClient : Prisma에서 자동 생성된 DB 클라이언트
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect(); //서버가 실행될 때 미리 DB 연결을 준비
  }
}
