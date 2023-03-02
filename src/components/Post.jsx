import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import styles from "./Post.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState([
    {
      id: uuidv4(),
      content: "Post Muito Bacana!!!",
      author: {
        avatarUrl: "https://github.com/judsoncabral.png",
        name: "Judson Cabral de Melo",
        role: "Java Developer",
      },
      publishedAt: new Date(),
    },
    {
      id: uuidv4(),
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
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function deleteComment(commentToDelete) {
    console.log(`Comentarios:  ${comments}`);
    //imutabilidade -> variaveis não sofrem mutacao( sempre novo espaço na memoria)
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment.id != commentToDelete.id;
    });
    console.log(`Comentarios:  ${commentsWithoutDeleteOne}`);
    setComments(commentsWithoutDeleteOne);
  }

  //Padronização de quando função é chamada pelo usuario tem prefixo handle;
  function handleCreateNewComment() {
    event.preventDefault();

    //Também poderia ser feito com ...coments, novo elemento
    // no caso setComments([...comments, comments.length + 1 ])
    setComments(
      comments.concat([
        {
          id: uuidv4(),
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

  const isNewCommentEmpty = newCommentText.length === 0;

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
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
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
