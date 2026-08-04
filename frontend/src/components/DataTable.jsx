function DataTable({ preview }) {
  if (!preview || preview.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "40px", overflowX: "auto" }}>
      <h2>Dataset Preview (First 5 Rows)</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px",
        }}
      >
        <thead>
          <tr>
            {Object.keys(preview[0]).map((column) => (
              <th
                key={column}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  backgroundColor: "#5B4BFF",
                  color: "white",
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {preview.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td
                  key={i}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {String(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;