import { useState } from "react";
import axios from "axios";
import "../styles/UploadBox.css";
import uploadIcon from "../assets/dataset.png";

function UploadBox() {

  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnInfo, setColumnInfo] = useState([]);
  const [statistics, setStatistics] = useState([]);

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

      setColumnInfo(response.data.column_info || []);

      setStatistics(response.data.statistics || []);

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

      console.log(
        "column_names:",
        response.data.column_names
      );

      console.log(
        "Column Information:",
        response.data.column_info
      );

      console.log(
        "Statistics:",
         response.data.statistics
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
          <img src={uploadIcon} alt="Upload Icon" />
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



        {columnInfo.length > 0 && (

          <div className="dataset-info">

            <h2>📋 Dataset Information</h2>

            <div className="table-container">

              <table className="info-table">

                <thead>

                  <tr>

                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Null Values</th>
                    <th>Non-Null Values</th>
                    <th>Unique Values</th>

                  </tr>

                </thead>

                <tbody>

                  {columnInfo.map((column, index) => (

                    <tr key={index}>

                      <td>{column.column_name}</td>

                      <td>{column.data_type}</td>

                      <td>{column.null_values}</td>

                      <td>{column.non_null_values}</td>

                      <td>{column.unique_values}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}




        {preview.length > 0 && (

          <div className="dataset-preview">

            <h2>
              📊 Dataset Preview
            </h2>

            <div className="table-container">
              <table className="preview-table">

            

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
          
          </div>


        )}

        {statistics.length > 0 && (
          
          <div className="statistics-section">

            <h2>📈 Statistical Summary</h2>

            <div className="table-container">

              <table className="statistics-table">
                
                <thead>
                  <tr>
                    <th>Column</th>
                    <th>Mean</th>
                    <th>Variance</th>
                    <th>Std Dev</th>
                    <th>Min</th>
                    <th>25%</th>
                    <th>Median</th>
                    <th>75%</th>
                    <th>Max</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.map((item,index)=>(
                    <tr key={index}>
                      <td>{item.column_name}</td>
                      <td>{item.mean}</td>
                      <td>{item.variance}</td>
                      <td>{item.std}</td>
                      <td>{item.min}</td>
                      <td>{item.q1}</td>
                      <td>{item.median}</td>
                      <td>{item.q3}</td>
                      <td>{item.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}



      </div>


    </section>

  );

}

export default UploadBox;