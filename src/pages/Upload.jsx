import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./UploadData.css";

const UploadData = ({ setFileUploaded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const backendURL = "https://predictivemain.onrender.com";

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      setError("");

      try {
        const uploadResponse = await axios.post(`${backendURL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (!uploadResponse.data.filename) {
          throw new Error("Invalid upload response from server.");
        }

        setFileUploaded(true); // ✅ Set upload flag
      } catch (err) {
        console.error("Error uploading file:", err);
        setError("File upload failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".txt",
  });

  return (
    <div className="upload-container">
      <h2>Upload Data</h2>

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the file here...</p> : <p>Drag & drop a .txt file or click to upload</p>}
      </div>

      {loading && <p>Processing...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UploadData;










