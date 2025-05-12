
import BookItem from "../components/book-item";
import style from "./page.module.css";
import { BookData } from "../../../types";

// 모든 책 불러오기 함수 // 
async function AllBooks() {
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

// 메인 함수 //
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
