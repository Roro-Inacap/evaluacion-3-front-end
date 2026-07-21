import { useState, useEffect } from "react";
import BookRow from "./BookRow";

function BookTable({ books, deleteBook, editBook, clearBooks }) {
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 10;

  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (orderBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (orderBy === "author") {
        return a.author.localeCompare(b.author);
      }

      if (orderBy === "year") {
        return Number(a.year) - Number(b.year);
      }

      return 0;
    });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;

  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="card shadow mb-5">
      <div className="card-header bg-dark text-white fw-bold">Registros Guardados</div>

      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar libro o autor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="col-md-2 mt-2 mt-md-0">
            <select
              className="form-select"
              value={orderBy}
              onChange={(e) => {
                setOrderBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Ordenar por...</option>

              <option value="title">Título</option>

              <option value="author">Autor</option>

              <option value="year">Año</option>
            </select>
          </div>

          <div className="col-md-3 mt-2 mt-md-0">
            <div className="alert alert-primary py-1 px-2 mb-0 text-center">
              Total libros: {books.length}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <button
            className="btn btn-danger"
            onClick={clearBooks}
            disabled={books.length === 0}
          >
            <i className="bi bi-trash3 me-2"></i>
            Eliminar Todo
          </button>

          {totalPages > 1 && (
            <nav>
              <ul className="pagination mb-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Anterior
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle fixed-table">
            <thead className="table-dark">
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Género</th>
                <th>Año</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {currentBooks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No existen registros
                  </td>
                </tr>
              ) : (
                currentBooks.map((book) => (
                  <BookRow
                    key={book.id}
                    book={book}
                    deleteBook={deleteBook}
                    editBook={editBook}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookTable;
