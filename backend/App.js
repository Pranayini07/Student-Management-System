const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors());
const nodemailer = require('nodemailer');

//to connect database
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'studentdetails',
  password: 'pranu_postgresql',
  port: 5432,
});


app.post('/details', async (req, res) => {
  const { status,name,surname,fathername,mothername,dob,gender,email,nationality,category,phonenumber,drno,village,mandal,
         district,pincode,sschallticketno,sscyop,ssctc,sscgpa,fourthschool,fourthschoolyop,fifthschool,fifthschoolyop,
         sixthschool,sixthschoolyop,seventhschool,seventhschoolyop,eightschool,eightschoolyop,ninthschool,ninthschoolyop,
         tenthschool,tenthschoolyop,allotment,rankcard,confirm,photo,income,caste,icrno,doj,polycetrank,polycethallticketno,
         feestatus,joiningphase,indemnitybond,year } = req.body;

      const sample=await pool.query('select * from admission where icrno = $1',[icrno]);
        if(sample.rows.length!==0){
          res.status(404).json('user already existed with this icrno.');
        }
  else{
  const newUser = await pool.query('INSERT INTO admission (status,name,surname,fathername,mothername,dob,gender,email,nationality,category,phonenumber,drno,village,mandal,district,pincode,sschallticketno,sscyop,ssctc,sscgpa,fourthschool,fourthschoolyop,fifthschool,fifthschoolyop,sixthschool,sixthschoolyop,seventhschool,seventhschoolyop,eightschool,eightschoolyop,ninthschool,ninthschoolyop,tenthschool,tenthschoolyop,allotment,rankcard,confirm,photo,income,caste,icrno,doj,polycetrank,polycethallticketno,feestatus,joiningphase,indemnitybond,year) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48) RETURNING *', [status,name,surname,fathername,mothername,dob,gender,email,nationality,category,phonenumber,drno,village,mandal,district,pincode,sschallticketno,sscyop,ssctc,sscgpa,fourthschool,fourthschoolyop,fifthschool,fifthschoolyop,sixthschool,sixthschoolyop,seventhschool,seventhschoolyop,eightschool,eightschoolyop,ninthschool,ninthschoolyop,tenthschool,tenthschoolyop,allotment,rankcard,confirm,photo,income,caste,icrno,doj,polycetrank,polycethallticketno,feestatus,joiningphase,indemnitybond,year]);

    if (newUser.rows.length > 0) {
      res.status(200).json({message:'User registered successfully',data:newUser.rows[0]});
    } else {
      res.status(400).send('User registration failed');
    }
  }
});


app.get('/dashboard',async (req, res) => {
  const users = await pool.query('SELECT * FROM admission');
  res.json(users.rows);
});

app.get('/dashboard', async (req, res) => {
  try {
    const { status , gender , category , year } = req.query;
    let query = 'SELECT * FROM students';

    if (status || gender || category || year) {
      query += ' WHERE';

      if (status) {
        query += `UPPER(status) = UPPER('${status}')`;
      }

      if (gender) {
        query += `gender = '${gender}'`;
      }

      if (status && gender && category && year) {
        query += 'AND';
      }

      if (category) {
        // Use UPPER() to make the comparison case-insensitive
        query += `UPPER(category) = UPPER('${category}')`;
      }

      if (year) {
        query += `UPPER(year) = UPPER('${year}')`;
      }
    }

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/updateYear', async (req, res) => {
  try {
    const { ids, year } = req.body;

    // Convert the array of IDs to a format that can be used in the SQL query
    const idValues = ids.map((id, index) => `$${index + 2}`).join(',');

    const query = `
      UPDATE admission
      SET year = $1
      WHERE icrno IN (${idValues})
      RETURNING *
    `;

    const updatedUsers = await pool.query(query, [year, ...ids]);

    res.status(200).json({
      message: 'Year updated successfully for selected students',
      data: updatedUsers.rows,
    });
  } catch (error) {
    console.error('Error updating year:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/deleteRow/:icrno', async (req, res) => {
  const { icrno } = req.params;

  try {
    const result = await pool.query('DELETE FROM admission WHERE icrno = $1', [icrno]);

    if (result.rowCount > 0) {
      res.status(200).json({ success: true, message: 'Row deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error deleting row:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



app.put('/updateRow/:icrno', async (req, res) => {
  const { icrno } = req.params;
  const updatedData = req.body;

  try {
    const result = await pool.query(
      'UPDATE admission SET status = $1, name = $2, surname = $3, fathername = $4, mothername = $5, dob = $6, gender = $7, email = $8, nationality = $9, category = $10, phonenumber = $11, drno = $12, village = $13, mandal = $14, district = $15, pincode = $16, sschallticketno = $17, sscyop = $18, ssctc = $19, sscgpa = $20, fourthschool = $21, fourthschoolyop = $22, fifthschool = $23, fifthschoolyop = $24, sixthschool = $25, sixthschoolyop = $26, seventhschool = $27, seventhschoolyop = $28, eightschool = $29, eightschoolyop = $30, ninthschool = $31, ninthschoolyop = $32, tenthschool = $33, tenthschoolyop = $34, allotment = $35, rankcard = $36, confirm = $37, photo = $38, income = $39, caste = $40, doj = $41, polycetrank = $42, polycethallticketno = $43, feestatus = $44, joiningphase = $45, indemnitybond = $46, year = $47 WHERE icrno = $48 RETURNING *',
      [
        updatedData.status,
        updatedData.name,
        updatedData.surname,
        updatedData.fathername,
        updatedData.mothername,
        updatedData.dob,
        updatedData.gender,
        updatedData.email,
        updatedData.nationality,
        updatedData.category,
        updatedData.phonenumber,
        updatedData.drno,
        updatedData.village,
        updatedData.mandal,
        updatedData.district,
        updatedData.pincode,
        updatedData.sschallticketno,
        updatedData.sscyop,
        updatedData.ssctc,
        updatedData.sscgpa,
        updatedData.fourthschool,
        updatedData.fourthschoolyop,
        updatedData.fifthschool,
        updatedData.fifthschoolyop,
        updatedData.sixthschool,
        updatedData.sixthschoolyop,
        updatedData.seventhschool,
        updatedData.seventhschoolyop,
        updatedData.eightschool,
        updatedData.eightschoolyop,
        updatedData.ninthschool,
        updatedData.ninthschoolyop,
        updatedData.tenthschool,
        updatedData.tenthschoolyop,
        updatedData.allotment,
        updatedData.rankcard,
        updatedData.confirm,
        updatedData.photo,
        updatedData.income,
        updatedData.caste,
        updatedData.doj,
        updatedData.polycetrank,
        updatedData.polycethallticketno,
        updatedData.feestatus,
        updatedData.joiningphase,
        updatedData.indemnitybond,
        updatedData.year,
        icrno,
      ]
    );


    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Row updated successfully',
        data: result.rows[0],
      });
    } else {
      res.status(404).json({ success: false, message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error updating row:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


//sem data

app.post('/semdata', async (req, res) => {
  const {sem,joiningyear,name,pin,result} = req.body;

    console.log(req.body);

      const sample=await pool.query('select * from semdata where pin = $1',[pin]);
        if(sample.rows.length!==0){
          res.status(404).json('user already existed with this pin number');
        }
  else{
  const newUser = await pool.query('INSERT INTO semdata (sem,joiningyear,name,pin,result) VALUES ($1, $2, $3, $4, $5) RETURNING *', [sem,joiningyear,name,pin,result]);

    if (newUser.rows.length > 0) {
      res.status(200).json({message:'User registered successfully',data:newUser.rows[0]});
    } else {
      res.status(400).send('User registration failed');
    }
  }
});


app.get('/semdatadashboard',async (req, res) => {
  const users = await pool.query('SELECT * FROM semdata');
  // console.log(users.rows);
  res.json(users.rows);
});

app.get('/semdatadashboard', async (req, res) => {
  const { sem } = req.query;
  let query = 'SELECT * FROM semdata';

  if (sem) {
    query += ` WHERE sem = $1`;
  }

  try {
    const users = await pool.query(query, [sem]);
    res.json(users.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/updateSem', async (req, res) => {
  try {
    const { ids, sem } = req.body;
    console.log(req.body)
    // Convert the array of IDs to a format that can be used in the SQL query
    const idValues = ids.map((id, index) => `$${index + 2}`).join(',');

    const query = `
      UPDATE semdata
      SET sem = $1
      WHERE pin IN (${idValues})
      RETURNING *
    `;

    const updatedUsers = await pool.query(query, [sem, ...ids]);
    console.log(updatedUsers)
    res.status(200).json({
      message: 'Year updated successfully for selected students',
      data: updatedUsers.rows,
    });
  } catch (error) {
    console.error('Error updating year:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.delete('/semdatadeleteRow/:pin', async (req, res) => {
  const { pin } = req.params;

  try {
    const result = await pool.query('DELETE FROM semdata WHERE pin = $1', [pin]);

    if (result.rowCount > 0) {
      res.status(200).json({ success: true, message: 'Row deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error deleting row:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.put('/semdataupdateRow/:pin', async (req, res) => {
  const { pin } = req.params;
  const updatedData = req.body;

  try {
    const result = await pool.query(
      'UPDATE semdata SET sem=$1,joiningyear=$2,name=$3,result=$4 WHERE pin = $5 RETURNING *',
      [
        updatedData.sem,
        updatedData.joiningyear,
        updatedData.name,
        updatedData.result,
        pin,
      ]
    );


    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Row updated successfully',
        data: result.rows[0],
      });
    } else {
      res.status(404).json({ success: false, message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error updating row:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// btech 
app.post('/btechform', async (req, res) => {
  const {name,diplomapin,ecetrank,joiningyear,btechclg,course} = req.body;

    console.log(req.body);

      const sample=await pool.query('select * from btechform where diplomapin = $1',[diplomapin]);
        if(sample.rows.length!==0){
          res.status(404).json('user already entered with this diploma pin number');
        }
  else{
  const newUser = await pool.query('INSERT INTO btechform (name,diplomapin,ecetrank,joiningyear,btechclg,course) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
    [name,diplomapin,ecetrank,joiningyear,btechclg,course]);

    if (newUser.rows.length > 0) {
      res.status(200).json({message:'User Entered Successfully',data:newUser.rows[0]});
    } else {
      res.status(400).send('Student data entry failed');
    }
  }
});

app.get('/btechdashboard', async (req, res) => {
  const users = await pool.query('SELECT * from btechform');
  res.json(users.rows);
});

app.get('/btechdashboard', async (req, res) => {
  const { diplomapin } = req.query;
  let query = 'SELECT * FROM btechform';

  // If gender is specified, add a WHERE clause to filter by gender
  if (diplomapin) {
    query += ` WHERE diplomapin = $1`;
  }

  try {
    const users = await pool.query(query, [diplomapin]);
    res.json(users.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/btechformdeleteRow/:diplomapin', async (req, res) => {
  const { diplomapin } = req.params;

  try {
    const result = await pool.query('DELETE FROM btechform WHERE diplomapin = $1', [diplomapin]);

    if (result.rowCount > 0) {
      res.status(200).json({ success: true, message: 'Row deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error deleting row:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.put('/btechformupdateRow/:diplomapin', async (req, res) => {
  const { diplomapin } = req.params;
  const updatedData = req.body;

  try {
    const result = await pool.query(
      'UPDATE btechform SET name=$1,ecetrank=$2,joiningyear=$3,btechclg=$4,course=$5 WHERE diplomapin = $6 RETURNING *',
      [
        updatedData.name,
        updatedData.ecetrank,
        updatedData.joiningyear,
        updatedData.btechclg,
        updatedData.course,
        diplomapin,
      ]
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Row updated successfully',
        data: result.rows[0],
      });
    } else {
      res.status(404).json({ success: false, message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error updating row:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



//job

app.post('/jobform', async (req, res) => {
  const {name,diplomapin,yearofjoining,company,role,ctc} = req.body;

    console.log(req.body);

      const sample=await pool.query('select * from jobform where diplomapin = $1',[diplomapin]);
        if(sample.rows.length!==0){
          res.status(404).json('user already entered with this diploma pin number');
        }
  else{
  const newUser = await pool.query('INSERT INTO jobform (name,diplomapin,yearofjoining,company,role,ctc) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
    [name,diplomapin,yearofjoining,company,role,ctc]);

    if (newUser.rows.length > 0) {
      res.status(200).json({message:'User Entered Successfully',data:newUser.rows[0]});
    } else {
      res.status(400).send('Student data entry failed');
    }
  }
});

app.get('/jobdashboard', async (req, res) => {
  const users = await pool.query('SELECT * from jobform');
  res.json(users.rows);
});

app.get('/jobdashboard', async (req, res) => {
  const { diplomapin } = req.query;
  let query = 'SELECT * FROM jobform';

  // If gender is specified, add a WHERE clause to filter by gender
  if (diplomapin) {
    query += ` WHERE diplomapin = $1`;
  }

  try {
    const users = await pool.query(query, [diplomapin]);
    res.json(users.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/jobformdeleteRow/:diplomapin', async (req, res) => {
  const { diplomapin } = req.params;

  try {
    const result = await pool.query('DELETE FROM jobform WHERE diplomapin = $1', [diplomapin]);

    if (result.rowCount > 0) {
      res.status(200).json({ success: true, message: 'Row deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error deleting row:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.put('/jobformupdateRow/:diplomapin', async (req, res) => {
  const { diplomapin } = req.params;
  const updatedData = req.body;

  try {
    const result = await pool.query(
      'UPDATE jobform SET name=$1,yearofjoining=$2,company=$3,role=$4,ctc=$5 WHERE diplomapin = $6 RETURNING *',
      [
        updatedData.name,
        updatedData.yearofjoining,
        updatedData.company,
        updatedData.role,
        updatedData.ctc,
        diplomapin,
      ]
    );


    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Row updated successfully',
        data: result.rows[0],
      });
    } else {
      res.status(404).json({ success: false, message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error updating row:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



//api for adminlogin and otp

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

const otpStorage = new Map();

app.get('/login/:email/:password', async (req, res) => {
  try{
    const { email,password } = req.params;
    const user = await pool.query(
      'SELECT * FROM login WHERE email = $1 and password = $2',
      [email,password]
    );
    if (user.rows.length === 0) {
        res.status(404).json('User not found');
    }
  const otp = generateOTP();
  const updateQuery = await pool.query(`UPDATE login SET otp = ${otp} WHERE email ='${user.rows[0].email}'`);
  // Store the OTP along with the user's email
  // otpStorage.set(email, otp);
  if(updateQuery){
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'pranu2166@gmail.com',
        pass: 'mijg veir foiz rqbr',
      },
    });

    const mailOptions = {
      from: 'pranu2166@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text:` Your 4-digit OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  }
  }
 catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending OTP via email' });
  }
});
// OTP verification route
app.post('/verifyotp', async(req, res) => {
  const { email, otp } = req.body;

  const verify_otp = await pool.query(`select * from login where email = '${email}'`);
  
  if (!verify_otp.rowCount>0) {
    return res.status(400).json({ message: 'Invalid user' });
  } else {
    console.log(verify_otp.rows[0].otp)
   if (req.body.otp == verify_otp.rows[0].otp){
    return res.status(200).json({ message: 'Otp verified successfully' });
   }else{
     return res.status(400).json({ message: 'Invalid OTP' });
   }
  }
});


//api for admin forgot password
app.get('/forgot/:email', async (req, res) => {
  try{
    const { email } = req.params;
    const user = await pool.query(
      'SELECT * FROM login WHERE email = $1',
      [email]
    );
    if (user.rows.length === 0) {
        res.status(404).json('User not found');
    }
  const otp = generateOTP();
  const updateQuery = await pool.query(`UPDATE login SET  otp = ${otp} WHERE email ='${user.rows[0].email}'`);
  // Store the OTP along with the user's email
  // otpStorage.set(email, otp);
  if(updateQuery){
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'pranu2166@gmail.com',
        pass: 'mijg veir foiz rqbr',
      },
    });

    const mailOptions = {
      from:'pranu2166@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text:` Your 4-digit OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  }
  }
 catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending OTP via email' });
  }
});
// OTP verification route
app.post('/verifying', async(req, res) => {
  const { email, otp } = req.body;

  const verify_otp = await pool.query(`select * from login where email = '${email}'`);
  
  if (!verify_otp.rowCount>0) {
    return res.status(400).json({ message: 'Invalid user' });
  } else {
    console.log(verify_otp.rows[0].otp)
   if (req.body.otp == verify_otp.rows[0].otp){
    return res.status(200).json({ message: 'Otp verified successfully' });
   }else{
     return res.status(400).json({ message: 'Invalid OTP' });
   }
  }
});
//api for newpassword
app.put('/newpassword/:newpassword', async (req, res) => {
  const { newpassword } = req.body;
  console.log(req.body)
  try {
    const updatepass = await pool.query('UPDATE login SET password = $1 ', [newpassword]);
    console.log(updatepass);
    if(updatepass){
      return res.status(200).json({ message: 'Password updated successfully' });
    }else{
      return res.status(200).json({ message: 'Password not updated successfully' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Password update failed' });
  }
});



app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
