import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Authors from "./components/authors/authors";
import Books from "./components/books/books";
import BookDetail from "./components/book-detail/book-detail";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import SearchBar from "./components/search-bar/search-bar";

function App() {
  const welcomeText = "Try to start with typing somethings";
  const navigate = useNavigate();
  return (
    <div>
      <SearchBar navigate={navigate} />
      <Breadcrumbs navigate={navigate} />
      <Routes>
        <Route path="/" element={<div>{welcomeText}</div>} />
        <Route path="/authors/:searchingWords" element={<Authors navigate={navigate}/>} />
        <Route path="/authors/:searchingWords/:authorsId/books" element={<Books navigate={navigate}/>} />
        <Route
          path="/authors/:searchingWords/:authorsId/books/:bookId"
          element={<BookDetail />}
        />
        <Route path="*" element={<div>{welcomeText}</div>} />
      </Routes>
    </div>
  );
}

export default App;
