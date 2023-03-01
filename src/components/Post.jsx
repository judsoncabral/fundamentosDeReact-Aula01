import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import styles from "./Post.module.css";
import { useState } from "react";

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      content: "Post Muito Bacana!!!",
      author: {
        avatarUrl: "https://github.com/judsoncabral.png",
        name: "Judson Cabral de Melo",
        role: "Java Developer",
      },
      publishedAt: new Date(),
    },
    {
      id: 2,
      content: "Mandou bem🚀🚀🚀",
      author: {
        avatarUrl: "https://github.com/jeef-js.png",
        name: "Jefferson Thiago",
        role: "Web full stack developer",
      },
      publishedAt: new Date("2023-02-26 14:55:00"),
    },
  ]);

  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange() {
    setNewCommentText(event.target.value);
  }

  function deleteComment(comment) {
    console.log(`Comentario:  ${comment}`);
  }

  //Padronização de quando função é chamada pelo usuario tem prefixo handle;
  function handleCreateNewComment() {
    event.preventDefault();

    //Também poderia ser feito com ...coments, novo elemento
    // no caso setComments([...comments, comments.length + 1 ])
    setComments(
      comments.concat([
        {
          id: comments.length + 1,
          content: newCommentText,
          author: {
            avatarUrl: "https://github.com/judsoncabral.png",
            name: "Judson Cabral de Melo",
            role: "Java Developer",
          },
          publishedAt: new Date(),
        },
      ])
    );

    setNewCommentText("");
  }

  return (
    <article className={styles.post}>
      <header className={styles.postHeader}>
        <div className={styles.author}>
          <Avatar hasBorder={true} src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href={line.content}>{line.linkName}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong> Deixe seu feedback</strong>
        <textarea
          id="comment"
          placeholder="Deixe um comentário "
          name="comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              content={comment.content}
              author={comment.author}
              publishedAt={comment.publishedAt}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
