import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/remedies');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div>
      <header>
        <div className="header-content">
          <h1>Wellnessify</h1>
          <p>Your Pathway to Better Health</p>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>
      <main>
        <section className="main-section">
          <h2>WELCOME TO OUR WEBSITE</h2>
          <h3>Where Compassion Meets Care</h3>
          <p>
            Dedicated to Healing, Compassion, and Excellence in Patient Care -
            Where Your Well-Being Comes First!
          </p>
          <button onClick={() => navigate('/appointment')}>Schedule Appointment</button>
          <button onClick={() => navigate('/info')}>More Info</button>
        </section>
        <section className="services">
          <h3>Our Services</h3>
          <div className="service-item">
            <h4>Compassionate Patient Support</h4>
            <p>
              From diagnosis to recovery, we prioritize your comfort, well-being,
              and peace of mind.
            </p>
            <button onClick={() => navigate('/service1')}>More Info</button>
          </div>
          <div className="service-item">
            <h4>Advanced Medical Care</h4>
            <p>
              Our multidisciplinary team ensures that every aspect of your health
              is addressed holistically, promoting optimal outcomes and long-term
              wellness.
            </p>
            <button onClick={() => navigate('/service2')}>More Info</button>
          </div>
          <div className="service-item">
            <h4>Patient-Centered Innovations</h4>
            <p>
              Explore our patient-centered innovations designed to enhance your
              healthcare journey, from convenient telemedicine options to
              interactive patient portals.
            </p>
            <button onClick={() => navigate('/service3')}>More Info</button>
          </div>
        </section>
        <section className="cta">
          <h3>Ready? Get started!</h3>
          <button onClick={() => navigate('/appointment')}>Schedule Appointment</button>
        </section>
      </main>
      <footer>
        <div className="contact-info">
          <p>Phone: (123) 456-7890</p>
          <p>Email: contact@wellnessify.com</p>
          <p>Address: 123 Health St, Wellness City</p>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="legal">
          <a href="/terms">Terms of Use</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <p>© 2024 Wellnessify. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
