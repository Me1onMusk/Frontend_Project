
'use server';

import { revalidateTag } from "next/cache";

// 리뷰 삭제 (서버액션) //
export async function deleteReviewAction(_: any, formData: FormData) {
    const reviewId = formData.get("reviewId")?.toString();
    const bookId = formData.get("bookId")?.toString();

    if(!reviewId) {
        return{
            status: false,
            message: "삭제할 리뷰가 없습니다"
        }
    }

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
            {method: "DELETE"});
        if(!response.ok){
            throw new Error(response.statusText);
        }
        
        revalidateTag(`reviews-${bookId}`);  //리뷰 삭제 후 페이지 새로고침 
        return{
            status: true,
            error: ""
        }
    }catch(error){
        return{
            status: false,
            error: `리뷰 삭제 실패했습니다: ${error}`
        }
    }
}