import { useEffect, useState } from "react";

function BookForm({ addBook, editingBook, updateBook, cancelEdit, showMessage }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    } else {
      setFormData({
        title: "",
        author: "",
        genre: "",
        year: "",
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.genre.trim() ||
      !formData.year.trim()
    ) {
      showMessage("Todos los campos son obligatorios.");
      return;
    }

    if (formData.title.trim().length < 3) {
      showMessage("El título debe tener al menos 3 caracteres");
      return;
    }

    if (formData.author.trim().length < 3) {
      showMessage("El autor debe tener al menos 3 caracteres");
      return;
    }

    if (
      Number(formData.year) < 1900 ||
      Number(formData.year) > new Date().getFullYear()
    ) {
      showMessage("Ingrese un año válido");
      return;
    }

    if (editingBook) {
      updateBook(formData);
    } else {
      addBook(formData);
    }

    setFormData({
      title: "",
      author: "",
      genre: "",
      year: "",
    });
  };

  const clearForm = () => {
    setFormData({
      title: "",
      author: "",
      genre: "",
      year: "",
    });

    if (editingBook) {
      cancelEdit();
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-dark text-white fw-bold">
        <i
          className={`bi ${editingBook ? "bi-pencil-square" : "bi-plus-circle"} me-2`}
        ></i>
        {editingBook ? "Editar Libro" : "Registrar Libro"}
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Título<span className="text-danger">*</span></label>

              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                autoComplete="off"
                maxLength="100"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Autor<span className="text-danger">*</span></label>

              <input
                type="text"
                className="form-control"
                name="author"
                value={formData.author}
                onChange={handleChange}
                autoComplete="off"
                maxLength="80"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Género<span className="text-danger">*</span></label>

              <input
                type="text"
                className="form-control"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                autoComplete="off"
                maxLength="50"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Año de publicación<span className="text-danger">*</span></label>

              <input
                type="number"
                className="form-control"
                name="year"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-save me-2"></i>

                {editingBook ? "Actualizar" : "Guardar"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearForm}
              >
                <i className="bi bi-x-circle me-2"></i>

                {editingBook ? "Cancelar" : "Limpiar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
