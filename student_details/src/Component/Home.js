import React from 'react'
import { useEffect } from 'react';
import { Link} from 'react-router-dom';

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
    // Navbar links
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
      // Cleanup event listeners on component unmount
      window.removeEventListener('load', navbarlinksActive);
    };
  }, []);


  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
     <header id="header" className="d-flex align-items-center">
     <div class="container-fluid container-xxl d-flex align-items-center">
  <div id="logo" className="me-auto">
    <Link to="/" className="scrollto">
      <img src="https://res.cloudinary.com/dgrys85u0/image/upload/v1676784497/APT_EMBLEM-removebg-preview_d50kel.png" alt="" title=""/>
    </Link>
  </div>

  <nav id="navbar" className="navbar order-last order-lg-0 ms-auto">
    <ul>
      <li><Link to="#" className="nav-link scrollto">Home</Link></li>
      <li><Link to="#" onClick={() => scrollToElement('about')} className="nav-link scrollto">About</Link></li>
      <li><Link to="#" onClick={() => scrollToElement('courses')} className="nav-link scrollto">Courses</Link></li>
      <li><Link to="#" onClick={() => scrollToElement('venue')} className="nav-link scrollto">Contact</Link></li>
    </ul>
    <i className="bi bi-list mobile-nav-toggle"></i>
  </nav>

  <Link className="buy-tickets scrollto" to="/Login">Teacher's Space</Link>
</div>
     </header>

    <section id="banner">
      <div className="banner-text text-white">
        <h1> <br/><span className="text-danger">ANDHRA POLYTECHNIC</span><br/> KAKINADA</h1>
        <img src="https://res.cloudinary.com/dgrys85u0/image/upload/v1676784497/APT_EMBLEM-removebg-preview_d50kel.png" alt="logo" height="150px"/>
        <h4>NH216, Lankada vari peta, Jagannaickpur, Kakinada, Andhra Pradesh 533002</h4>        
      </div>
    </section>

    <section id="about">
      <div className="container">
        <div className="row about-text">
          <div className="col-6">
            <h1>About The College</h1>
            <p>Andhra Polytechnic, Kakinada, is more than just a technical institution. It is a place where dreams are born, nurtured, and realized. It is a place where students can discover their passion, hone their skills, and unlock their potential. It is a place where education is not just a means to an end, but a journey of self-discovery and personal growth.</p>
          </div>
          <div className="col-3">
            <h4>WHERE</h4>
            <p>NH216, Lankada vari peta, Jagannaickpur, Kakinada, Andhra Pradesh 533002</p>
          </div>
          <div className="col-3">
            <h4>Timings</h4>
            <p>9:30AM to 4:30PM</p>
          </div>
        </div>
      </div>
    </section><br/><br/>
    <section id="courses">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 text-center section-header">
                    <h1>COURSES</h1>
                    <p>Here are some Courses Offered by Us</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-4">
                <div className="wcu-card p-3 mb-3">
                    <h1 className="wcu-card-title mt-3">Architecture Engineering</h1>
                    <p className="wcu-card-description">
                        The study of designing and planning structures, from homes to skyscrapers, with a focus on aesthetic appeal, functionality, and sustainability.
                    </p>
                </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="wcu-card p-3 mb-3">
                    <h1 className="wcu-card-title mt-3">Automobile Engineering</h1>
                    <p className="wcu-card-description">
                        The study of designing, developing, and manufacturing vehicles, including cars, trucks, and motorcycles, with a focus on improving performance, safety, and efficiency.
                    </p>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="wcu-card p-3 mb-3">
                    <h1 className="wcu-card-title mt-3">Civil Engineering</h1>
                    <p className="wcu-card-description">
                        The study of designing, constructing, and maintaining the physical and natural built environment, including buildings, roads, bridges, and water supply systems.
                    </p>
                    </div>
                </div>
            </div>
            <div className="row">
            <div className="col-12 col-md-4">
                <div className="wcu-card p-3 mb-3">
                  <h1 className="wcu-card-title mt-3">Computer Engineering</h1>
                  <p className="wcu-card-description">
                    The study of designing and developing computer hardware and software systems, with a focus on programming, algorithms, and data structures.
                  </p>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div className="wcu-card p-3 mb-3">
                  <h1 className="wcu-card-title mt-3">Electrical and Electronics Engineering</h1>
                  <p className="wcu-card-description">
                    The study of designing, developing, and testing electrical and electronic systems, including power generation, transmission, and distribution, as well as electronics for communication and entertainment.
                  </p>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div className="wcu-card p-3 mb-3">
                  <h1 className="wcu-card-title mt-3">Electronics and Communication Engineering</h1>
                  <p className="wcu-card-description">
                    The study of designing, developing, and testing electronic communication systems, including television, radio, and mobile phones, as well as computer networking and satellite communication.
                  </p>
                </div>
            </div>
        </div>
        </div>  
    </section>

    
    <section id="venue">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center section-header">
            <h1>Contact Us</h1>
            <p>Here are our Contacts and Location</p>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-lg-6 venue-map">
          <iframe title="Andhra Polytechnic Location Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.898446351119!2d82.23037121744385!3d16.9303009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3827eb32268f59%3A0xf1eaf501d757f10e!2sAndhra%20Polytechnic!5e0!3m2!1sen!2sin!4v1680286919722!5m2!1sen!2sin" width="600" height="450" style={mapstyle} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>        
          </div>

          <div className="col-lg-6 venue-info">
            <div className="row justify-content-center">
              <div className="col-11 col-lg-8 position-relative">
                <h3>Jagannaickpur, Kakinada</h3>
                <p>Phone:0884-2376192</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Home