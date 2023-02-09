export function Post(props) {
  return (
    <div>
      <strong> {props.author}</strong>
      <br></br>
      <p>{props.content}</p>
    </div>
  );
}
