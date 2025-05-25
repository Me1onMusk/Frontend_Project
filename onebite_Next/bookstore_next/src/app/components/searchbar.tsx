'use client';

import { useState } from 'react';

// 검색바 컴포넌트 //
export default function Searchbar() {
  const [search, setSearch] = useState('');
  //검색어 변경 확인
  const onChangeSearch = () => {};
  //엔터
  const onKeyDown = () => {};
  //전송
  const onSubmit = () => {};

  return (
    <div>
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
