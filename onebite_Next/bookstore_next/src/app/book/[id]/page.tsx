import style from './page.module.css';
import { Book } from '../../../../types';

// 도서 상세 함수 //
async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
  if (!response.ok) {
    return <div>오류가 발생했습니다</div>;
  }
  const book: Book = await response.json();

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${book.coverImgUrl}')` }}
      >
        <img src={book.coverImgUrl} />
      </div>
      <div className={style.title}>{book.title}</div>
      <div className={style.subTitle}>{book.subTitle}</div>
      <div className={style.author}>
        {book.author} | {book.publisher}
      </div>
      <div className={style.description}>{book.description}</div>
    </section>
  );
}

// 리뷰 목록 컴포넌트 //
async function ReviewList() {}

// 도서 상세 페이지 //
export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
    </div>
  );
}
