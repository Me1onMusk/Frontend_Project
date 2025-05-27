import { Todo } from "../types";

interface Props extends Todo {
  onClickDelete: (id: number) => void;
}

export default function ToDoItem(props: Props) {
  const onClickDelete = () => {
    props.onClickDelete(props.id);
  };

  return (
    <div>
      {props.id}번 : {props.content}
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
}
