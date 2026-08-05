import { useState } from "react";
import axios from "axios";
import "../styles/UploadBox.css";

function UploadBox() {

  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState([]);
  const [columns, setColumns] = useState([]);

  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState(0);
  const [totalColumns, setTotalColumns] = useState(0);


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



      // Store backend data safely

      setPreview(response.data.preview || []);

      setColumns(response.data.column_names || []);

      setFileName(response.data.filename || "Unknown");

      setRows(response.data.row_count || 0);

      setTotalColumns(response.data.column_count || 0);



      // Debug output

      console.log(
        "Preview:",
        response.data.preview
      );

      console.log(
        "Rows:",
        response.data.row_count
      );

      console.log(
        "Columns:",
        response.data.column_count
      );

      console.log(
        "File:",
        response.data.filename
      );


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


        <h1>
          Upload Your Dataset
        </h1>


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
            onChange={(e) =>
              setFile(e.target.files[0])
            }
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





        {preview.length > 0 && (

          <div className="dataset-summary">


            <h2>
              📊 Dataset Summary
            </h2>



            <div className="summary-card">


              <div className="summary-item">

                <h4>
                  📄 File Name
                </h4>

                <p>
                  {fileName}
                </p>

              </div>




              <div className="summary-item">

                <h4>
                  📈 Rows
                </h4>

                <p>
                  {rows.toLocaleString()}
                </p>

              </div>




              <div className="summary-item">

                <h4>
                  📑 Columns
                </h4>

                <p>
                  {totalColumns}
                </p>

              </div>




              <div className="summary-item">

                <h4>
                  👀 Preview
                </h4>

                <p>
                  {preview.length} Rows
                </p>

              </div>



            </div>


          </div>

        )}






        {preview.length > 0 && (

          <div
            style={{
              marginTop: "40px",
              width: "100%",
              overflowX: "auto"
            }}
          >


            <h2>
              📊 Dataset Preview
            </h2>




            <table
              border="1"
              cellPadding="8"
            >


              <thead>

                <tr>

                  {columns.map((col) => (

                    <th key={col}>
                      {col}
                    </th>

                  ))}

                </tr>

              </thead>




              <tbody>


                {preview.map((row, index) => (

                  <tr key={index}>


                    {columns.map((col) => (

                      <td key={col}>

                        {String(row[col] ?? "")}

                      </td>

                    ))}


                  </tr>

                ))}


              </tbody>


            </table>


          </div>

        )}



      </div>


    </section>

  );

}


export default UploadBox;