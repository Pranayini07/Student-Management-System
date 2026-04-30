import { useEffect, useState } from "react";
import "../App.css";
import * as XLSX from "xlsx";

function JobExcel(props) {
  const data = props.selectedRowsData
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jobdashboard")
      .then((res) => res.json())
      .then((json) => setDetails(json));
  }, []);

  const matchingElements = details.filter((item) => data.includes(item.diplomapin));
  console.log(matchingElements,"matchingElements")

  const handleDownload = () => {
    const matchingElements = details.filter((item) => data.includes(item.diplomapin));

    const rows = matchingElements.map((item) => ({
            name: item.name,
            diplomapin: item.diplomapin,
            ecetrank: item.yearofjoining,
            joiningyear: item.company,
            btechclg: item.role,
            course: item.ctc,
    }));

    // create workbook and worksheet  name,diplomapin,joiningyear,companyname,role,ctc
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Details");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Name","Diploma Pin","Joining Year","Company Name","Role","CTC (Package)"],
    ]);

    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
  };
  return (
    <div className="wrapper">
      <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
    </div>
  );
}

export default JobExcel;