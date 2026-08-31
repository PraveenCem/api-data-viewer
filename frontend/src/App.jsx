import { useEffect, useState } from 'react';
import './App.css'
import getPosts from './services/api'


function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, settCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search,setSearch] = useState("");

  const totalPages = Math.ceil(total / 10);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  useEffect(() => {

    async function loadPosts() {
      try {
        const posts = await getPosts(currentPage,search);
        setPosts(posts.data);
        setTotal(posts.total);
      } catch (error) {
        // console.log("CAUGHT ERROR:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [currentPage,search]);

  function handleSearch(event){
    setSearch(event.target.value);
    settCurrentPage(1);
  }

  return (
    <div className='app'>
      <h1>API Data viewer</h1>
      <input type="text" placeholder='search posts...' 
      value={search} onChange={handleSearch} />
      {error && <p className='status error'>{error.message}</p>}
      {!loading && !error && posts.length ===0 && 
        <p>No posts found</p>
      }
      {loading && 
       <p className='status loading'>Loading data....</p>}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 && posts.map((item) =>
              <tr key={item.id}>
                <td >
                  {item.title}
                </td>
                <td>
                  {item.body}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='page-info'>
        page: {currentPage} of {totalPages}
      </div>
      <div className='pagination'>
        <button onClick={() => settCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => settCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>

        )
        )}
      </div>

      <button onClick={() => settCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>

    </div>
  )
}

export default App
