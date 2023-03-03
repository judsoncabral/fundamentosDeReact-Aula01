import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import styles from "./Post.module.css";
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { CommentType } from "./Comment";

export interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}
interface Content {
  type: "paragraph" | "link";
  content: string;
  linkName?: string;
}
export interface PostType {
  id: string;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface postProps {
  post: PostType;
}

export function Post({ post }: postProps) {
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
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function deleteComment(commentToDelete: CommentType) {
    console.log(`Comentarios:  ${comments}`);
    //imutabilidade -> variaveis não sofrem mutacao( sempre novo espaço na memoria)
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment.id != commentToDelete.id;
    });
    console.log(`Comentarios:  ${commentsWithoutDeleteOne}`);
    setComments(commentsWithoutDeleteOne);
  }

  //Padronização de quando função é chamada pelo usuario tem prefixo handle;
  function handleCreateNewComment(event: FormEvent) {
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
          <Avatar hasBorder={true} src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map((line: Content) => {
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
        {comments.map((comment: CommentType) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
