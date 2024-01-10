const API_URL = "http://localhost:3000";

class BooksAPI {
  static async getBooks() {
    const response = await fetch(`${API_URL}/books/books`, {
      method: "GET",
    });
    return await response.json();
  }

  static async getBook(id) {
    const response = await fetch(`${API_URL}/books/books/${id}`, {
      method: "GET",
    });
    return await response.json();
  }

  static async createBook(book) {
    await fetch(`${API_URL}/books/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
  }

  static async updateBook(id, book) {
    await fetch(`${API_URL}/books/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
  }

  static async deleteBook(id) {
    const response = await fetch(`${API_URL}/books/books/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  }
}

export default BooksAPI;
