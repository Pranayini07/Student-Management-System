import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaArrowRight, FaClock, FaMapMarkerAlt, FaGraduationCap, FaPhoneAlt } from 'react-icons/fa';

const Home = () => {
  const mapstyle = {
    border: '0',
    height: '450px',
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar links active state on scroll
   */
  const select = (selector, all = false) => {
    return all
      ? document.querySelectorAll(selector)
      : document.querySelector(selector);
  };

  useEffect(() => {
    let navbarlinks = select('#navbar .scrollto', true);

    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      });
    };

    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);

    return () => {
      window.removeEventListener('load', navbarlinksActive);
    };
  }, []);

  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <header id="header" className="d-flex align-items-center">
        <div className="container-fluid container-xxl d-flex align-items-center">
          <div id="logo" className="me-auto">
            <Link to="/" className="scrollto">
              <img
                src="https://res.cloudinary.com/dgrys85u0/image/upload/v1676784497/APT_EMBLEM-removebg-preview_d50kel.png"
                alt="APT Logo"
                title="Andhra Polytechnic"
              />
            </Link>
          </div>

          <nav id="navbar" className="navbar order-last order-lg-0 ms-auto">
            <ul>
              <li>
                <Link to="#" onClick={() => scrollToElement('banner')} className="nav-link scrollto active">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => scrollToElement('teacher-portal')} className="nav-link scrollto">
                  Faculty Space
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => scrollToElement('about')} className="nav-link scrollto">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => scrollToElement('courses')} className="nav-link scrollto">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => scrollToElement('venue')} className="nav-link scrollto">
                  Contact
                </Link>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <Link className="buy-tickets scrollto" to="/Login">
            <FaUserShield style={{ marginRight: '6px' }} /> Teacher's Space
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section id="banner">
        <div className="banner-text text-white">
          <h1>
            <span className="text-danger">ANDHRA POLYTECHNIC</span>
            <br />
            KAKINADA
          </h1>
          <img
            src="https://res.cloudinary.com/dgrys85u0/image/upload/v1676784497/APT_EMBLEM-removebg-preview_d50kel.png"
            alt="logo"
            height="140px"
          />
          <h4>
            <FaMapMarkerAlt style={{ marginRight: '8px', color: '#f82249' }} />
            NH216, Lankada vari peta, Jagannaickpur, Kakinada, Andhra Pradesh 533002
          </h4>
        </div>
      </section>

      {/* Teacher's Space Management Access Section */}
      <section id="teacher-portal">
        <div className="container">
          <div className="teacher-portal-banner">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <span className="teacher-banner-badge">
                  <FaUserShield style={{ marginRight: '6px' }} /> Faculty & Staff Access
                </span>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '14px', color: '#ffffff' }}>
                  Teacher's Space Management Portal
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7', marginBottom: '22px', textAlign: 'left' }}>
                  Manage student admissions, semester result data, B.Tech provisional records, and job placements through a streamlined faculty dashboard.
                </p>
                <Link
                  to="/Login"
                  className="btn btn-primary px-4 py-2"
                  style={{
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  Access Teacher's Space <FaArrowRight />
                </Link>
              </div>
              <div className="col-lg-5 mt-4 mt-lg-0">
                <div className="teacher-credentials-box">
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#38bdf8',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Default Faculty Credentials
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '13px',
                    }}
                  >
                    <span style={{ color: '#94a3b8' }}>Email:</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#f8fafc' }}>teacher@gmail.com</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '13px',
                    }}
                  >
                    <span style={{ color: '#94a3b8' }}>Password:</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#f8fafc' }}>teacher@123</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      fontSize: '13px',
                    }}
                  >
                    <span style={{ color: '#94a3b8' }}>Default OTP:</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#38bdf8' }}>1234</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="row about-text align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1>About The College</h1>
              <p>
                Andhra Polytechnic, Kakinada, is more than just a technical institution. It is a place where dreams are born, nurtured, and realized. It is a place where students can discover their passion, hone their skills, and unlock their potential. It is a place where education is not just a means to an end, but a journey of self-discovery and personal growth.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-3 mb-md-0">
              <h4>
                <FaMapMarkerAlt style={{ marginRight: '6px' }} /> WHERE
              </h4>
              <p>NH216, Lankada vari peta, Jagannaickpur, Kakinada, Andhra Pradesh 533002</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4>
                <FaClock style={{ marginRight: '6px' }} /> Timings
              </h4>
              <p>9:30 AM to 4:30 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Offered */}
      <section id="courses" style={{ padding: '70px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center section-header">
              <h1>
                <FaGraduationCap style={{ marginRight: '10px', color: '#f82249' }} />
                COURSES
              </h1>
              <p>Here are some Courses Offered by Us</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="wcu-card p-4">
                <h2 className="wcu-card-title mt-2">Architecture Engineering</h2>
                <p className="wcu-card-description mt-2">
                  The study of designing and planning structures, from homes to skyscrapers, with a focus on aesthetic appeal, functionality, and sustainability.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="wcu-card p-4">
                <h2 className="wcu-card-title mt-2">Automobile Engineering</h2>
                <p className="wcu-card-description mt-2">
                  The study of designing, developing, and manufacturing vehicles, including cars, trucks, and motorcycles, with a focus on improving performance, safety, and efficiency.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="wcu-card p-4">
                <h2 className="wcu-card-title mt-2">Civil Engineering</h2>
                <p className="wcu-card-description mt-2">
                  The study of designing, constructing, and maintaining the physical and natural built environment, including buildings, roads, bridges, and water supply systems.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="wcu-card p-4">
                <h2 className="wcu-card-title mt-2">Computer Engineering</h2>
                <p className="wcu-card-description mt-2">
                  The study of designing and developing computer hardware and software systems, with a focus on programming, algorithms, and data structures.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="wcu-card p-4">
                <h2 className="wcu-card-title mt-2">Electrical & Electronics Engineering</h2>
                <p className="wcu-card-description mt-2">
                  The study of designing, developing, and testing electrical and electronic systems, including power generation, transmission, and distribution.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="wcu-card p-4">
                <h2 className="wcu-card-title mt-2">Electronics & Communication</h2>
                <p className="wcu-card-description mt-2">
                  The study of designing, developing, and testing electronic communication systems, including radio, satellite communication, and computer networking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="venue">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center section-header">
              <h1>
                <FaPhoneAlt style={{ marginRight: '10px', color: '#f82249', fontSize: '28px' }} />
                Contact Us
              </h1>
              <p>Here are our Contacts and Location</p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 venue-map">
              <iframe
                title="Andhra Polytechnic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.898446351119!2d82.23037121744385!3d16.9303009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3827eb32268f59%3A0xf1eaf501d757f10e!2sAndhra%20Polytechnic!5e0!3m2!1sen!2sin!4v1680286919722!5m2!1sen!2sin"
                width="600"
                height="450"
                style={mapstyle}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="col-lg-6 venue-info d-flex align-items-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-11 col-lg-9 position-relative">
                    <h3>Jagannaickpur, Kakinada</h3>
                    <p style={{ fontSize: '18px', marginTop: '12px' }}>
                      <FaPhoneAlt style={{ marginRight: '8px' }} /> Phone: 0884-2376192
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;