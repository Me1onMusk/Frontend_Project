
import style from "./review-item.module.css";   
import { ReviewData } from "../../../types";
import ReviewItemDeleteButton from "./review-item-delete-button";

// 리뷰 아이템 함수 //
export default function ReviewItem({id, content, author, createdAt, bookId}: ReviewData) {
    return (
        <div className={style.container}>
            <div className={style.author}>{author}</div>
            <div className={style.content}>{content}</div>
            <div className={style.bottom_container}>
                <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
                <ReviewItemDeleteButton reviewId={id} bookId={bookId}/>
            </div>
        </div>
    )
}