import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookTable from "./components/BookTable";
import ApiBooks from "./components/ApiBooks";
import "./App.css";

function App() {
  const [books, setBooks] = useState(() => {
    try {
      const storedBooks = localStorage.getItem("books");

      return storedBooks ? JSON.parse(storedBooks) : [];
    } catch (error) {
      console.error("Error recuperando libros:", error);

      return [];
    }
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [bookToDelete, setBookToDelete] = useState(null);

  const [deleteAll, setDeleteAll] = useState(false);

  const [editingBook, setEditingBook] = useState(null);

  const [showApi, setShowApi] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    const exists = books.some(
      (b) =>
        b.title.toLowerCase().trim() === book.title.toLowerCase().trim() &&
        b.author.toLowerCase().trim() === book.author.toLowerCase().trim(),
    );

    if (exists) {
      setMessage("Este libro ya se encuentra registrado.");
      return;
    }

    setBooks((prevBooks) => [
      ...prevBooks,
      {
        ...book,
        id: Date.now(),
        createdAt: new Date().toLocaleDateString(),
      },
    ]);

    setMessage("Libro agregado correctamente.");
  };

  const deleteBook = (id) => {
    setDeleteAll(false);
    setBookToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteBook = () => {
    if (deleteAll) {
      setBooks([]);
      setMessage("Todos los registros fueron eliminados.");
    } else {
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookToDelete),
      );

      setMessage("Libro eliminado correctamente.");
    }

    setShowDeleteModal(false);
    setBookToDelete(null);
    setDeleteAll(false);
  };

  const updateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book,
      ),
    );

    setEditingBook(null);

    setMessage("Libro actualizado correctamente.");
  };

  const clearBooks = () => {
    setDeleteAll(true);
    setShowDeleteModal(true);
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="container py-4">
      <nav className="navbar bg-dark bg-gradient shadow-lg rounded-3 mb-3 py-3">
        <div className="container-fluid flex-column">
          <span className="navbar-brand text-white fs-3 fw-bold mb-1">
            <i className="bi bi-journal-bookmark-fill me-2"></i>
            Gestión de Libros
          </span>

          <small className="text-white-50">
            React • Bootstrap • LocalStorage • Open Library API
          </small>
        </div>
      </nav>

      {message && (
        <div
          className="toast-container position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            className="toast show align-items-center text-bg-success border-0"
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body">
                <i className="bi bi-check-circle me-2"></i>
                {message}
              </div>

              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setMessage("")}
              ></button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4"></div>

      <BookForm
        addBook={addBook}
        editingBook={editingBook}
        updateBook={updateBook}
        cancelEdit={cancelEdit}
        showMessage={setMessage}
      />

      <BookTable
        books={books}
        deleteBook={deleteBook}
        editBook={setEditingBook}
        clearBooks={clearBooks}
      />

      <div className="text-center mb-4">
        <button
          className="btn btn-success"
          onClick={() => setShowApi(!showApi)}
        >
          <i className="bi bi-cloud-download me-2"></i>

          {showApi ? "Ocultar Libros API" : "Ver Libros desde API"}
        </button>
      </div>

      <div className={showApi ? "d-block" : "d-none"}>
        <ApiBooks addBook={addBook} savedBooks={books} />
      </div>

      {showDeleteModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                    {deleteAll
                      ? "Confirmar eliminación masiva"
                      : "Confirmar eliminación"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  {deleteAll
                    ? "¿Desea eliminar todos los registros?"
                    : "¿Desea eliminar este libro?"}
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={confirmDeleteBook}
                  >
                    {deleteAll ? "Eliminar Todo" : "Eliminar"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

      <footer className="text-center text-muted mt-5 py-3 border-top">
        <p className="mb-1 fw-semibold">
          <i className="bi bi-book-half me-2"></i>
          Gestión de Libros
        </p>

        <small>
          Aplicación SPA desarrollada con React, Bootstrap, LocalStorage y Open
          Library API
        </small>
      </footer>
    </div>
  );
}

export default App;
