import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import "./global.css";
import styles from "./App.module.css";

const post = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/judsoncabral.png",
      name: "Judson Cabral de Melo",
      role: "Java Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz" +
          "no Ignite do Rocketseat. O nome do projeto é Ignite Feed 🚀",
      },
      {
        type: "link",
        content: "https://github.com/judsoncabral",
        linkName: "Judson Cabral github",
      },
    ],
    publishedAt: new Date("2023-02-20 19:25:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/jeef-js.png",
      name: "Jefferson Thiago",
      role: "Web full stack developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz" +
          "no Ignite do Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: "link",
        content: "https://github.com/jeef-js",
        linkName: "Jefferson Thiago github",
      },
    ],
    publishedAt: new Date("2023-02-26 14:55:00"),
  },
];

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {post.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
