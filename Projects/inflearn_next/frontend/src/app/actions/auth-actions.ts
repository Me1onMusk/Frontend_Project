'use server';

import { saltAndHashPassword } from '@/lib/password-utils';
import { prisma } from '../../../prisma';

// 회원가입 (비동기) - 서버 //
export async function signUp({ email, password }: { email: string; password: string }) {
  try {
    //1.이미 존재하는 이메일인지 확인
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      //존재하는 이메일이면 알림
      return { status: 'error', error: '이미 존재하는 이메일입니다.' };
    }

    //2.회원가입 처리
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: saltAndHashPassword(password), //비밀번호 해시화
      },
    });

    //3.회원가입 성공 시
    if (user) {
      return { status: 'ok' };
    }
  } catch (error) {
    //오류 발생 시 알림
    return { status: 'error', error: '회원가입에 실패했습니다.' };
  }
}
