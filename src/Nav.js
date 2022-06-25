import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);

  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );

  useEffect(() => {
    setSearchResults(
      posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase())
        )
        .reverse()
    );
  }, [posts, search, setSearchResults]);

  return (
    <nav className="Nav">
      <form
        autoComplete="off"
        className="searchForm"
        onClick={(e) => e.preventDefault()}
      >
        <label htmlFor="search">Search Posts </label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <h2>{search}</h2>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
