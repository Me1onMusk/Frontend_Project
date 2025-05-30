import { PrismaClient } from '@prisma/client'; //Prisma를 통해 데이터베이스와 상호작용할 수 있게 해주는 객체
import { v4 as uuidv4 } from 'uuid'; //각 카테고리에 고유한 ID를 생성할 때 사용됨

const prisma = new PrismaClient(); //Prisma를 통해 DB에 쿼리를 날릴 수 있도록 클라이언트를 생성함

async function main() {
  await prisma.$connect(); //비동기로 DB 연결 시작

  await prisma.courseCategory.deleteMany({}); //기존에 존재하던 카테고리 삭제

  // 카테고리 //
  const categories = [
    {
      id: uuidv4(),
      name: '개발 · 프로그래밍',
      slug: 'it-programming',
      description: '',
    },
    {
      id: uuidv4(),
      name: '게임 개발',
      slug: 'game-dev-all',
      description: '',
    },
    {
      id: uuidv4(),
      name: '데이터 사이언스',
      slug: 'data-science',
      description: '',
    },
    {
      id: uuidv4(),
      name: '인공지능',
      slug: 'artificial-intelligence',
      description: '',
    },
    {
      id: uuidv4(),
      name: '보안 · 네트워크',
      slug: 'it',
      description: '',
    },
    {
      id: uuidv4(),
      name: '하드웨어',
      slug: 'hardware',
      description: '',
    },
    {
      id: uuidv4(),
      name: '디자인 · 아트',
      slug: 'design',
      description: '',
    },
    {
      id: uuidv4(),
      name: '기획 · 경영 · 마케팅',
      slug: 'business',
      description: '',
    },
    {
      id: uuidv4(),
      name: '업무 생산성',
      slug: 'productivity',
      description: '',
    },
    {
      id: uuidv4(),
      name: '커리어 · 자기계발',
      slug: 'career',
      description: '',
    },
    {
      id: uuidv4(),
      name: '대학 교육',
      slug: 'academics',
      description: '',
    },
  ];

  // 위에서 정의한 카테고리 배열을 한 번에 데이터베이스에 추가함. //
  await prisma.courseCategory.createMany({
    data: categories,
  });

  console.log('카테고리 시드 데이터가 성공적으로 생성되었습니다.');
}

main()
  .catch((error) => {
    console.error('시드 데이터 생성 중 오류가 발생했습니다', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); //정상 실행 여부와 상관없이 Prisma 연결을 종료.
  });
