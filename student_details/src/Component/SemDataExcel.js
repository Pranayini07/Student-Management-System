import { useEffect, useState } from "react";
import "../App.css";
import * as XLSX from "xlsx";

function SemDataExcel(props) {
  const data = props.selectedRowsData
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/semdatadashboard")
      .then((res) => res.json())
      .then((json) => setDetails(json));
  }, []);

  const matchingElements = details.filter((item) => data.includes(item.pin));
  console.log(matchingElements,"matchingElements")

  const handleDownload = () => {
    const matchingElements = details.filter((item) => data.includes(item.pin));

    const rows = matchingElements.map((item) => ({
            sem: item.sem,
            joiningyear: item.joiningyear,
            name: item.name,
            pin: item.pin,
            result: item.result,
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Details");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Semister","Year of Join","Name","Pin Number","Result"],
    ]);

    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
  };
  return (
    <div className="wrapper">
      <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
    </div>
  );
}

export default SemDataExcel;