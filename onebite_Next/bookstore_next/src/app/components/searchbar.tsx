'use client';

import { useState } from 'react';
import style from './searchbar.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// 검색바 컴포넌트 //
export default function Searchbar() {
  const router = useRouter(); //경로 이동
  const searchParams = useSearchParams(); //비동기 쿼리
  const [search, setSearch] = useState(''); //검색어 상태 관리

  const q = searchParams.get('q');

  //컴포넌트가 렌더링된 후 실행되는 함수
  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  //검색어 변경 확인
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  //엔터
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit();
  };

  //전송
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div className={style.container}>
      <input
        value={search}
        placeholder="검색어를 입력하세요"
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
