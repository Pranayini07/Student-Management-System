import React from 'react'
import { Link} from 'react-router-dom';

const AdminHome = () => {
  return (

    <>
   <nav className="navbar navbar-expand-lg navbar-bg p-2">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto navigation-links">
        <Link className="nav-link navigation-links px-5 " to="/Dashboard">Admission</Link>
        <Link className="nav-link navigation-links px-5" to="/SemDataDashboard">Student Details</Link>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle px-5" href='form' role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Provisional Form
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/BTechDashboard">Btech Dashboard</Link></li>
            <li><Link class="dropdown-item" to="/JobDashboard">Job Dashboard</Link></li>
          </ul>
        </li>
      </div>
    </div>
  </div>
</nav>
    <section className='bg-white pb-2'>
      <div className="container">
        <div className="row g-0">
        <div className="col-md-6 text-center mt-3 ">
        <img src="https://res.cloudinary.com/dgrys85u0/image/upload/v1676784497/APT_EMBLEM-removebg-preview_d50kel.png" alt="logo" height="150px"/>
          <div className='teacher-header'>
            <h1>Teacher's Space</h1>
            <p> A place where teacher can manage their Student details and their data. </p>
          </div>   
          <center>
         <p className='description'> The Teacher's Dashboard serves as the command center for efficient student information management. Tailored for educators, this dynamic interface provides quick access to essential forms such as Admission, Provision, and Student Details. With a user-friendly navbar, teachers can seamlessly navigate between forms and a comprehensive student list, ensuring streamlined data entry and retrieval. The Dashboard's simplicity, coupled with powerful features like data filtering and download options, empowers teachers to effortlessly oversee and update student details in a secure and organized manner.</p>
          </center>   
        </div>
          <div className="col-md-6">
            <img src="https://i.pinimg.com/564x/bf/0a/50/bf0a50c874694f2eb8b2849558ab665e.jpg" alt="Teacher" className="img-fluid" />
          </div>
        </div>
      </div><br/><br/><br/><br/>

    </section>
    </>
  )
}

export default AdminHome