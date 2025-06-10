import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], //이 모듈은 데이터베이스 기능을 사용할 수 있다.
  controllers: [CoursesController], //CoursesController는 HTTP 요청을 처리하는 역할.
  providers: [CoursesService], //CoursesService는 비즈니스 로직을 처리하는 곳.
  exports: [CoursesService], //다른 모듈에서도 CoursesService를 가져다가 사용할 수 있도록 해줌.
})
export class CoursesModule {}
