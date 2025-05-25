import { BookData } from '../../../types';
import BookItem from '../components/book-item';
import style from './page.module.css';

// 모든 책 불러오기 함수 //
async function AllBooks() {
  //백엔드 서버에서 데이터 fetch
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: 'force-cache',
  });

  //응답 없으면 오류처리
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  //응답문서 -> Json으로 변환 (인터페이스 타입)
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 추천 책 불러오기 함수 //
async function RecoBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {
    cache: 'force-cache',
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 메인 페이지 //
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
