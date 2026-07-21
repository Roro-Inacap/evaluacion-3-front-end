function BookRow({ book, deleteBook, editBook }) {
  return (
    <tr>
      <td title={book.title}>{book.title}</td>

      <td title={book.author}>{book.author}</td>

      <td>
        {book.genre === "Importado desde API" ? (
          <span className="badge bg-success">Importado</span>
        ) : (
          book.genre
        )}
      </td>

      <td>{book.year}</td>

      <td>{book.createdAt || "-"}</td>

      <td className="text-center">
        <button
          title="Editar libro"
          className="btn btn-warning btn-sm me-2"
          onClick={() => editBook(book)}
        >
          <i className="bi bi-pencil-square"></i>
        </button>

        <button
          title="Eliminar libro"
          className="btn btn-danger btn-sm"
          onClick={() => deleteBook(book.id)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default BookRow;
