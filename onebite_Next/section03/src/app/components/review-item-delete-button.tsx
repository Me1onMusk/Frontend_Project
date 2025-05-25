
'use client';

import { useEffect, useRef } from "react";
import style from "./review-item.module.css";   
import { deleteReviewAction } from "../actions/delete-review.action";
import { useActionState } from "react";

export default function ReviewItemDeleteButton({reviewId, bookId}: {reviewId: number, bookId: number}) {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

    useEffect(() => {
        if(state && !state.status){
            alert(state.error);
        }
    }, [state]);

    return (
        //폼 강제 전송
        <form ref={formRef} action={formAction}>  
            <input type="hidden" name="reviewId" value={reviewId} readOnly />
            <input type="hidden" name="bookId" value={bookId} readOnly />
            {
                isPending ? <div>삭제중...</div> :
                <div className={style.delete_button} onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
            }
        </form>
    )
}
