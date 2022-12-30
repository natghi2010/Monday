import Spinner from 'react-bootstrap/Spinner';

function Loading(props) {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">{props.text == undefined ? 'Loading...': props.text}</span>
    </Spinner>
  );
}

export default Loading;