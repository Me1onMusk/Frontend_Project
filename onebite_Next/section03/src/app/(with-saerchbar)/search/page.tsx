
import BookItem from "@/app/components/book-item";
import { BookData } from "../../../../types";

// 메인 함수 //
export default async function Page({searchParams}: {searchParams: Promise<{ q?: string }>;}) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${(await searchParams).q}`, {cache: "force-cache"});
  if(!response.ok) {return <div>오류가 발생했습니다</div>}
  const books : BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (<BookItem key={book.id} {...book} />))}
    </div>
  );
}
