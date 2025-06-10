import { Course } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateCourseDto } from './dto/update-course.dto';
import { NotFoundException } from '@nestjs/common';

//이 클래스는 DI(의존성 주입)이 가능하다는 뜻.
@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {} //DB에 접근할 수 있는 Prisma 서비스가 주입됨.

  // 강의 생성 //
  async create(userId: string, createCourseDto: CreateCourseDto): Promise<Course> {
    const { categoryIds, ...otherData } = createCourseDto;

    return this.prisma.course.create({
      data: {
        ...otherData,
        category: {
          connect: categoryIds?.map((id) => ({ id })),
        },
        instructorId: userId, //필드로 해당 강사 ID를 함께 저장
      },
    });
  }

  // 여러 강의 조회 //
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor: Prisma.CourseWhereUniqueInput;
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithRelationInput;
  }): Promise<Course[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.course.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // 특정 강의 조회 //
  async findOne(id: string, include?: string[]): Promise<Course | null> {
    const includeObject = {};

    if (include) {
      include.forEach((item) => {
        includeObject[item] = true;
      });
    }

    const course = await this.prisma.course.findUnique({
      where: { id },
      include: include && include.length > 0 ? includeObject : undefined,
    });

    return course;
  }

  // 강의 수정 //
  async update(id: string, userId: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    //먼저 해당 id의 강의가 존재하는지 확인
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) throw new NotFoundException(`ID: ${id} 코스를 찾을 수 없습니다.`);

    if (course.instructorId !== userId)
      throw new UnauthorizedException('강의의 소유자만 수정할 수 있습니다.');

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  // 강의 삭제 //
  async delete(id: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) throw new NotFoundException(`ID: ${id} 코스를 찾을 수 없습니다.`); //강의가 존재하는지 확인

    if (course.instructorId !== userId)
      throw new UnauthorizedException('강의의 소유자만 삭제할 수 있습니다.'); //본인(userId)이 작성한 강의인지 검사

    await this.prisma.course.delete({
      where: { id },
    });
  }
}
