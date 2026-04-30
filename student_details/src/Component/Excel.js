import { useEffect, useState } from "react";
import "../App.css";
import * as XLSX from "xlsx";

function Excel(props) {
  const data = props.selectedRowsData
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dashboard")
      .then((res) => res.json())
      .then((json) => setDetails(json));
  }, []);

  const matchingElements = details.filter((item) => data.includes(item.icrno));
  console.log(matchingElements,"matchingElements")

  const handleDownload = () => {
    const matchingElements = details.filter((item) => data.includes(item.icrno));

    const rows = matchingElements.map((item) => ({
      status: item.status,
      name: item.name,
      surname: item.surname,
      fathername: item.fathername,
      mothername: item.mothername,
      dob: item.dob,
      gender: item.gender,
      email: item.email,
      nationality: item.nationality,
      category: item.category,
      phonenumber: item.phonenumber,
      drno: item.drno,
      village: item.village,
      mandal: item.mandal,
      district: item.district,
      pincode: item.pincode,
      sschallticketno: item.sschallticketno,
      sscyop: item.sscyop,
      ssctc: item.ssctc,
      sscgpa: item.sscgpa,
      fourthschool: item.fourthschool,
      fourthschoolyop: item.fourthschoolyop,
      fifthschool: item.fifthschool,
      fifthschoolyop: item.fifthschoolyop,
      sixthschool: item.sixthschool,
      sixthschoolyop: item.sixthschoolyop,
      seventhschool: item.seventhschool,
      seventhschoolyop: item.seventhschoolyop,
      eightschool: item.eightschool,
      eightschoolyop: item.eightschoolyop,
      ninthschool: item.ninthschool,
      ninthschoolyop: item.ninthschoolyop,
      tenthschool: item.tenthschool,
      tenthschoolyop: item.tenthschoolyop,
      allotment: item.allotment,
      rankcard: item.rankcard,
      confirm: item.confirm,
      photo: item.photo,
      income: item.income,
      caste: item.caste,
      icrno: item.icrno,
      doj: item.doj,
      polycetrank: item.polycetrank,
      polycethallticketno: item.polycethallticketno,
      feestatus: item.feestatus,
      joiningphase: item.joiningphase,
      indemnitybond: item.indemnitybond,
      year: item.year,
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Details");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Status", "Name", "Surname", "Father Name", "Mother Name", "DOB", "Gender", "Email", "Nationality", "Category", "Phone Number","DrNo.","Village","Mandal","District","Pincode","SSCHtno.","SSC YearOfPassing","Transfer Certificate","SSC GPA","4thClass Name","4thClass YearOfPassing","5thClass Name","5thClass YearOfPassing","6thClass Name","6thClass YearOfPassing","7thClass Name","7thClass YearOfPassing","8thClass Name","8thClass YearOfPassing","9thClass Name","9thClass YearOfPassing","10thClass Name","10thClass YearOfPassing","Allotment Order","Polycet RankCard","Joining Report","Student Photo","Income Certificate Number","Caste Certificate Number","ICRNo.","Date Of Joining","Polycet Rank","Polycet Htno.","Fee Status","Joining Phase","Indemnity Bond","Year/Sem"],
    ]);

    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
  };
  return (
    <div className="wrapper">
      <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
    </div>
  );
}

export default Excel;