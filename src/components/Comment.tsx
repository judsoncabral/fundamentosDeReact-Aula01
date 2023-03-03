import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Trash, ThumbsUp } from "phosphor-react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { useState, FormEvent } from "react";
import { Author } from "./Post";

export interface CommentType {
  id: string;
  content: string;
  author: Author;
  publishedAt: Date;
}

interface CommentProps {
  comment: CommentType;
  onDeleteComment: (comment: CommentType) => void;
}
export function Comment({ comment, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  const publishedDateFormatted = format(
    comment.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(comment.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleLikeComment() {
    setLikeCount((newLikeCount) => {
      return newLikeCount + 1;
    });
  }

  function handleDeleteComment(event: FormEvent) {
    event.preventDefault();
    console.log("delete comment");
    onDeleteComment(comment);
  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={comment.author.avatarUrl} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{comment.author.name}</strong>
              <time
                title={publishedDateFormatted}
                dateTime={comment.publishedAt.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{comment.content}</p>
        </div>

        <footer className={styles.commentFooter}>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={24} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
