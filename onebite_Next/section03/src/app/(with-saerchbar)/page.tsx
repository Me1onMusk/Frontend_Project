
import BookItem from "../components/book-item";
import style from "./page.module.css";
import { BookData } from "../../../types";
import { Suspense } from "react";
import { delay } from "../util/delay";
import BookListSkeleton from "../components/skeleton/book-list-skeleton";

//1. auto : 기본값, 아무것도 강제하지 않음.
//2. force-dynamic : 페이지를 강제로 동적 페이지로 설정.
//3. force-static : 페이지를 강제로 정적 페이지로 설정.
//4. error : 페이지를 강제로 정적 페이지로 설정 (설정하면 안되는 이유 -> 빌드 오류)

// 모든 책 불러오기 함수 // 
async function AllBooks() {
  // await delay(1500);  //1.5초 대기 (테스트)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: "force-cache"});  //book 데이터 불러오기, dynamic 
  if (!response.ok) {return <div>오류가 발생했습니다</div>}
  const allBooks : BookData[] = await response.json();

  return (
    <div>
      {
        allBooks.map((book) => (<BookItem key={book.id} {...book} />))
      }
    </div>
  )
};

// 추천 책 불러오기 함수 //
async function RecoBooks() {
  // await delay(3000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {next: {revalidate: 3}});  //3초후 갱신 
  if(!response.ok) {return <div>오류가 발생했습니다.</div>}
  const recoBooks : BookData[] = await response.json();

  return (
    <div>
        {
          recoBooks.map((book) => (<BookItem key={book.id} {...book} />))
        }
    </div>
  )
};

export const dynamic = "force-dynamic";  //강제로 다이나믹 페이지로 만들기 

// 메인 함수 //
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={
          <BookListSkeleton count={3} />
        }> 
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={
          <BookListSkeleton count={10} />
        }>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
