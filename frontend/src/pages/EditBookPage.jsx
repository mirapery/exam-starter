import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBookPage = () => {
  const [book, setBook] = useState(null); // Initialize book state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { id } = useParams();
  // console.log(id);
  

  // Declare state variables for form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [borrower, setBorrower] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

  const updateBook = async (book) => {
    try {
      console.log("Updating book:", book);
      const res = await fetch(`/api/books/${book.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });
      if (!res.ok) throw new Error("Failed to update book");
      return res.ok;
    } catch (error) {
      console.error("Error updating book:", error);
      return false;
    }
  };

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setBook(data); // Set the book data

        // Initialize form fields with fetched book data
        setTitle(data.title);
        setAuthor(data.author);
        setISBN(data.isbn);
        setIsAvailable(data.availability.isAvailable);
        setBorrower(data.availability.borrower);
      } catch (error) {
        console.error("Failed to fetch book:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchBook();
  }, [id]);

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    const updatedBook = {
      id,
      title,
      author,
      isbn,
      availability: {
        isAvailable,
        borrower,
      },
    };

    const success = await updateBook(updatedBook);
    if (success) {
      console.log("Book Updated Successfully");
      navigate(`/books/${id}`);
    } else {
      console.error("Failed to update the book");
    }
  };

  const handleAvailabilityChange = (e) => {
    setIsAvailable(e.target.value === "Yes");
  };

  return (
    <div className="create">
      <h2>Update Book</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Book title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>ISBN:</label>
          <input
            type="text"
            required
            value={isbn}
            onChange={(e) => setISBN(e.target.value)}
          />
          <label>Availability:</label>
          <select
            value={isAvailable ? "Yes" : "No"}
            onChange={handleAvailabilityChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label>borrower:</label>
          <input
            type="text"
            required
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
          />
          <button>Update Book</button>
        </form>
      )}
    </div>
  );
};

export default EditBookPage;
