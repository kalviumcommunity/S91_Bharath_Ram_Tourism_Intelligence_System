import { useState } from "react";
import { useAuth } from "../AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({
    text: "",
    error: false,
  });
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setMessage({
      text: "",
      error: false,
    });

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Allow common image formats
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setFile(null);

      setMessage({
        text: "Please select a JPG, PNG, or WebP image.",
        error: true,
      });

      return;
    }

    // Maximum file size: 5 MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFile(null);

      setMessage({
        text: "File size must be less than 5 MB.",
        error: true,
      });

      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    setMessage({
      text: "",
      error: false,
    });

    if (!token) {
      setMessage({
        text: "Please log in first.",
        error: true,
      });

      return;
    }

    if (!file) {
      setMessage({
        text: "Please select an image first.",
        error: true,
      });

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        setMessage({
          text: "Your login session has expired. Please log in again.",
          error: true,
        });

        return;
      }

      if (response.ok) {
        setMessage({
          text: "File uploaded successfully!",
          error: false,
        });

        setFile(null);

        // Reset file input
        e.target.reset();
      } else {
        setMessage({
          text: data.message || "File upload failed.",
          error: true,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);

      setMessage({
        text: "Unable to connect to the server.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Upload Destination Image</h2>

      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="file">
            Select an image
          </label>

          <input
            id="file"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <p>
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !file}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {message.text && (
        <p role={message.error ? "alert" : "status"}>
          {message.text}
        </p>
      )}
    </div>
  );
}

export default FileUpload;