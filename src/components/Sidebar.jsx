import Styles from "./Sidebar.module.css";
import { LinkedinLogo, GithubLogo } from "phosphor-react";
import { Avatar } from "./Avatar";
export function Sidebar() {
  return (
    <aside className={Styles.sidebar}>
      <img
        className={Styles.cover}
        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
      ></img>
      <div className={Styles.profile}>
        <Avatar hasBorder={true} src="https://github.com/judsoncabral.png" />
        <strong>Judson Cabral de Melo</strong>
        <span>Web Developer Fullstack</span>
      </div>

      <footer>
        <a
          href="https://www.linkedin.com/in/judson-cabral-de-melo/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinLogo size={20} />
          LinkedIn
        </a>
        <a
          href="https://github.com/judsoncabral"
          target="_blank"
          rel="noreferrer"
        >
          <GithubLogo size={20} />
          Github
        </a>
      </footer>
    </aside>
  );
}
