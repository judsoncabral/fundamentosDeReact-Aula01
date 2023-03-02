import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Trash, ThumbsUp } from "phosphor-react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

export function Comment({ comment, onDeleteComment }) {
  const publishedDateFormatted = format(
    comment.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(comment.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleDeleteComment() {
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
          <button>
            <ThumbsUp size={24} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
