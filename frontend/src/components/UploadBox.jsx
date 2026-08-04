import { useState } from "react";
import axios from "axios";
import "../styles/UploadBox.css";

function UploadBox() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a dataset first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      console.log(response.data);
      alert("Dataset uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
    <section className="upload-section">

      <div className="upload-card">

        <div className="upload-icon">
          ☁️
        </div>

        <h1>Upload Your Dataset</h1>

        <p>
          Drag & Drop your CSV or Excel file
          <br />
          or browse from your computer
        </p>

        <label className="choose-btn">
          📁 Choose File
          <input
            type="file"
            accept=".csv,.xlsx"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && (
          <div className="selected-file">
            ✅ {file.name}
          </div>
        )}

        <button
          className="upload-btn"
          onClick={handleUpload}
        >
          🚀 Analyze Dataset
        </button>

      </div>

    </section>
  );
}

export default UploadBox;