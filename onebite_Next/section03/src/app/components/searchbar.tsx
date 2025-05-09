"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";  //앱 라우터 
import style from "./serachbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();  //query 
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  // 입력 // 
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 전송 // 
  const onSubmit = () => {
    if (!search || q === search) return;  //입력 값이 없으면 return 반환 
    router.push(`/search?q=${search}`);
  };

  // 엔터 // 
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit(); 
  };

  return (
    <div className={style.container}>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
