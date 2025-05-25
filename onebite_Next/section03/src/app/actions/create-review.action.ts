
'use server';

import { revalidatePath } from "next/cache";

// 리뷰 생성 (서버액션) //
export async function createReviewAction(formData: FormData) {
    
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();
    
    if(!content || !author || !bookId) {  //content와 author가 없으면 리뷰 작성 안됨. (서버측 예외처리)
      return;
    }

    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, 
        {method: "POST", body: JSON.stringify({bookId, content, author})});
        
      if(!response.ok){
        throw new Error("리뷰 작성 실패");
      }
      revalidatePath(`/book/${bookId}`);  //리뷰 작성 후 페이지 새로고침 
    }catch(error){
      console.error(error); 
    }
  }