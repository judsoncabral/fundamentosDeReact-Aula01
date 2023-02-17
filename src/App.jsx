import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import "./global.css";
import styles from "./App.module.css";
export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author="Judson Cabral"
            content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae saepe maxime sed ipsam cupiditate aliquid. Itaque odio nesciunt id dolore odit esse pariatur magni, quibusdam hic tempora veniam dolorum explicabo?"
          />
          <Post
            author="Filomena Cabral"
            content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae saepe maxime sed ipsam cupiditate aliquid. Itaque odio nesciunt id dolore odit esse pariatur magni, quibusdam hic tempora veniam dolorum explicabo?"
          />
        </main>
      </div>
    </div>
  );
}
