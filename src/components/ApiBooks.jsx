import { useState } from "react";

function ApiBooks({ addBook, savedBooks }) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!search.trim()) {
      setError("Ingrese un término de búsqueda.");
      setBooks([]);
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}`,
      );

      if (!response.ok) {
        throw new Error("Error al obtener datos");
      }

      const data = await response.json();

      setBooks(data.docs.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFromApi = (book) => {
    addBook({
      title: book.title || "Sin título",
      author: book.author_name?.[0] || "Desconocido",
      genre: "Importado desde API",
      year: String(book.first_publish_year || new Date().getFullYear()),
    });
  };

  const isImported = (apiBook) => {
    return savedBooks.some(
      (book) =>
        book.title.toLowerCase().trim() ===
          (apiBook.title || "").toLowerCase().trim() &&
        book.author.toLowerCase().trim() ===
          (apiBook.author_name?.[0] || "").toLowerCase().trim(),
    );
  };

  const getCoverUrl = (book) => {
    return book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : null;
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-success text-white fw-bold">
        Buscar libros en Open Library (API externa)
      </div>

      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe el título o autor de un libro para buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchBooks();
                }
              }}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-success w-100 mt-2 mt-md-0"
              onClick={searchBooks}
            >
              <i className="bi bi-search me-2"></i>
              Buscar
            </button>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-secondary w-100 mt-2 mt-md-0"
              onClick={() => {
                setSearch("");
                setBooks([]);
                setError("");
                setLoading(false);
              }}
            >
              <i className="bi bi-x-circle me-2"></i>
              Limpiar
            </button>
          </div>
        </div>

        {loading && (
          <div className="alert alert-info">Cargando información...</div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>Portada</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Año</th>
                  <th className="api-action-column text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No se encontraron resultados
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book.key}>
                      <td className="text-center">
                        {getCoverUrl(book) ? (
                          <img
                            src={getCoverUrl(book)}
                            alt={book.title}
                            className="book-cover"
                          />
                        ) : (
                          <i className="bi bi-book text-secondary fs-4"></i>
                        )}
                      </td>
                      <td>{book.title}</td>

                      <td>{book.author_name?.[0] || "N/D"}</td>

                      <td>{book.first_publish_year || "N/D"}</td>

                      <td className="api-action-column text-center">
                        <button
                          className="btn btn-success btn-sm"
                          disabled={isImported(book)}
                          onClick={() => addFromApi(book)}
                        >
                          <i
                            className={`bi ${
                              isImported(book)
                                ? "bi-check-circle"
                                : "bi-download"
                            } me-1`}
                          ></i>

                          {isImported(book)
                            ? "Importado"
                            : "Agregar a mis libros"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiBooks;
