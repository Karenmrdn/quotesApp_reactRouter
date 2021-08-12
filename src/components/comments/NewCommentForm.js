import { useRef, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    // We could validate here

    await sendRequest({
      commentData: { text: enteredText },
      quoteId: props.quoteId,
    });

    props.onCancel();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCancel} type="button" className="btn">
          Cancel
        </button>
        <button type="submit" className="btn">
          Add a Comment
        </button>
      </div>
    </form>
  );
};

export default NewCommentForm;
