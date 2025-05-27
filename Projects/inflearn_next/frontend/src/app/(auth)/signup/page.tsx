'use client';

import { signUp } from '@/app/actions/auth-actions';
import { useState } from 'react';
import { redirect } from 'next/navigation';

// 회원가입 페이지 //
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  //폼 제출 시 처리 로직
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //비밀번호와 재비밀번호가 같지 않으면
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = await signUp({
      email,
      password,
    });

    //회원가입 결과가 OK이면 로그인으로 이동
    if (result?.status === 'ok') {
      redirect('/signin');
    }
    //결과가 오류면 메세지 출력
    if (result?.error) {
      alert(result.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">회원가입</h1>
      <p className="text-gray-700">안프런에서 다양한 학습의 기회를 얻으세요</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="email">이메일</label>
        <input
          className="border-2 border-gray-300 rounded-sm p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="example@inflab.com"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          className="border-2 border-gray-300 rounded-sm p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="12345678"
        />
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          className="border-2 border-gray-300 rounded-sm p-2"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          type="password"
          name="passwordCheck"
          placeholder="12345678"
        />
        <button
          className="bg-green-500 text-white rounded-md font-bold p-2 cursor-pointer"
          type="submit"
        >
          가입하기
        </button>
        <p className="text-gray-700 text-sm">
          해당 계정은 통합회원으로 인프런과 랠릿에서 제공하는 서비스를 모두 이용하실 수 있습니다.{' '}
          <br />
          가입 시, 통합 계정 및 서비스 이용약관 (인프런 / 랠릿), 개인정보 처리방침에 동의하는 것으로
          간주합니다.
        </p>
      </form>
    </div>
  );
}
