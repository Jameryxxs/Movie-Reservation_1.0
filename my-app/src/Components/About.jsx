import React from 'react';
import backgroundImage from '../images/back.png';
import backgroundimageforbody from '../images/Rectangle 28.png'; 


const About = () => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom,rgb(2, 16, 39), rgb(53, 70, 109))',
      color: 'white',
      
      
    }}>

      {/* Hero Image */}
      <div style={{
        backgroundImage: `url(${backgroundImage})`,
        height: '180px',
        backgroundSize: 'cover',
        backgroundPosition: ' center',
        backgroundRepeat:'no-repeat',
        width: '100%'

      }}></div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '30px',
        paddingBottom: '100px',
        overflowY: 'auto',
        marginTop:'50px'
      }}>
        <h2 style={{
          textAlign: 'center',
          borderBottom: '2px solid #00BFFF',
          paddingBottom: '10px',
          color: '#fff',
          fontSize: '50px',
          padding: '20px',
          fontStyle: 'italic',
          marginBottom:'30px'
        }}>ABOUT</h2>

        <section style={{ marginTop: '20px' }}>
          <h3 style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: '30px',
            padding: '20px',
            fontStyle: 'italic'
          }}>PROJECT OVERVIEW</h3>
          <p  style={{padding:'20px'}}>This web application is designed to simulate a movie research platform, offering details on various movies, genres, and statistics. It integrates API calls, state management, and modern front-end techniques to provide a streamlined experience while demonstrating real-world application of front-end web technologies.</p>
        </section>

        <section style={{ marginTop: '20px' }}>
          <h3 style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: '30px',
            padding: '20px',
          }}>PURPOSE AND EDUCATIONAL USE</h3>
          <p style={{padding:'20px'}} >This web-based app is created solely for educational purposes. It aims to demonstrate design principles, styling, and the power of external APIs while teaching essential skills such as data handling and responsive interface design.</p>
        </section>

        <section style={{
          marginTop: '50px',
          padding: '15px',
          backgroundColor: '#1A2A4F',
          borderRadius: '10px',
        }}>
          <h3 style={{
            color: '#00BFFF',
            textAlign: 'center',
            fontSize: '20px',
            padding: '20px',
          }}>DISCLAIMER</h3>
          <p style={{padding:'20px'}}>All movie-related content, including posters, images, and descriptions, are used for educational and non-commercial purposes only. No copyright infringement is intended, and all materials remain owned by the respective media owners.</p>
        </section>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'rgb(63, 80, 121)',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '14px'
      }}>
        © 2025 Movie World. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
