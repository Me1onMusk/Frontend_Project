
import BookItem from "@/app/components/book-item";
import { BookData } from "../../../../types";
import { Suspense } from "react";
import BookListSkeleton from "@/app/components/skeleton/book-list-skeleton";

async function SearchResult({q}: {q:string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {cache: "force-cache"});
  if(!response.ok) {return <div>오류가 발생했습니다</div>}
  const books : BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (<BookItem key={book.id} {...book} />))}
    </div>
  );
}

// 메인 함수 //
export default function Page({searchParams}: {searchParams: {q?: string}}) {

  return (
    // suspense = 미완성 => 스트리밍 (지연시 사용)
    <Suspense key={searchParams.q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q = {searchParams.q || ""} />
    </Suspense>
  )
}
