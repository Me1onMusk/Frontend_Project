import { BookData } from '../../../../types';
import BookItem from '../../components/book-item';

// 검색 결과 처리 (비동기) //
async function SearchResult({ q }: { q: string }) {
  //검색어 쿼리 조회
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {
    cache: 'force-cache',
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  //응답 결과 -> Json
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 메인 페이지 //
export default function Page({ searchParams }: { searchParams: { q?: string } }) {
  return <SearchResult q={searchParams.q || ''} />;
}
