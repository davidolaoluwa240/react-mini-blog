import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);
  const getPostById = useStoreState((state) => state.getPostById);

  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const editPost = useStoreActions((actions) => actions.editPost);

  const { id } = useParams();
  const post = getPostById(id);
  const { push } = useHistory();

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = function (id) {
    const datetime = format(new Date(), "MMMM dd, yyyyy pp");
    const updatedPost = { id, title: editTitle, body: editBody, datetime };

    editPost(updatedPost);
    // GO TO HOME
    push(`/post/${id}`);
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title: </label>
            <input
              type="text"
              id="editTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Post: </label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
