import Feed from "./Feed";
import { useStoreState } from "easy-peasy";

const Home = ({ isLoading, fetchError }) => {
  const posts = useStoreState((state) => state.searchResults);

  if (isLoading)
    return (
      <main className="Home">
        <p className="statusMsg">Loading posts...</p>
      </main>
    );

  if (fetchError)
    return (
      <main className="Home">
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      </main>
    );

  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p className="statusMsg">No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
