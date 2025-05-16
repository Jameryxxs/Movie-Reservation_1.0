import { useState } from 'react';
import "./Reserved.css";

const MovieSeatReservation = () => {
  // States
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentDate, setCurrentDate] = useState(24); // Current selected date
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Seat status: 0 = available, 1 = reserved/taken, 2 = newly selected
  const initialSeatMap = [
    ['A1', 'A9', 'A17', 'A25', 'A33', 'A41', 'A13', 'A10'],
    ['A2', 'A10', 'A18', 'A26', 'A34', 'A42', 'A12', 'A10'],
    ['A3', 'A11', 'A19', 'A27', 'A35', 'A43', 'A13', 'A11'],
    ['A4', 'A12', 'A20', 'A28', 'A36', 'A44', 'A12', 'A10'],
    ['A5', 'A13', 'A21', 'A29', 'A37', 'A45', 'A13', 'A10'],
    ['A6', 'A14', 'A22', 'A30', 'A38', 'A46', 'A12', 'A10'],
    ['A7', 'A15', 'A23', 'A31', 'A39', 'A47', 'A12', 'A10'],
    ['A8', 'A16', 'A24', 'A32', 'A40', 'A48', 'A12', 'A10']
  ];
  
  // Pre-determine which seats are reserved
  const initialSeatStatus = Array(10).fill().map(() => Array(9).fill(0));
  
  // Mark specific seats as reserved (purple in the UI, will be rendered as red)
  initialSeatStatus[0][0] = 1; // A13
  initialSeatStatus[0][2] = 1; // A13
  initialSeatStatus[1][2] = 1; // A10
  initialSeatStatus[2][0] = 1; // A13
  initialSeatStatus[2][2] = 1; // A13
  initialSeatStatus[4][0] = 1; // A13
  initialSeatStatus[4][2] = 1; // A13
  initialSeatStatus[5][2] = 1; // A10
  
  const [seatStatus, setSeatStatus] = useState(initialSeatStatus);
  
  // Calendar date selection
  const dates = [
    { day: 'Wed', date: 21 },
    { day: 'Thu', date: 22 },
    { day: 'Fri', date: 23 },
    { day: 'Sat', date: 24 },
    { day: 'Sun', date: 25 },
    { day: 'Mon', date: 26 },
    { day: 'Tue', date: 27 }
  ];
  
  // Time slots
  const timeSlots = [
    { time: '16.00', selected: false },
    { time: '16.00', selected: true },
    { time: '16.00', selected: false },
    { time: '16.00', selected: false }
  ];
  
  // Handle seat selection
  const handleSeatClick = (row, col) => {
    // Skip if seat is empty or already reserved
    if (initialSeatMap[row][col] === '' || seatStatus[row][col] === 1) {
      return;
    }
    
    const newSeatStatus = [...seatStatus];
    const seatId = initialSeatMap[row][col];
    
    // Toggle selection status
    if (newSeatStatus[row][col] === 0) {
      // Select seat
      newSeatStatus[row][col] = 2;
      setSelectedSeats([...selectedSeats, seatId]);
      setTotalPrice(totalPrice + 250);
    } else if (newSeatStatus[row][col] === 2) {
      // Deselect seat
      newSeatStatus[row][col] = 0;
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
      setTotalPrice(totalPrice - 250);
    }
    
    setSeatStatus(newSeatStatus);
  };
  
  // Handle date selection
  const handleDateSelect = (date) => {
    setCurrentDate(date);
  };
  
  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Left panel - Movie Selection */}
        <div className="panel">
          <div className="panel-content">
            {/* Top Navigation */}
            <div className="top-nav">
              <button className="icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="logo-text">Movie Watch</div>
              <div className="user-controls">
                <button className="icon-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <div className="user-avatar"></div>
              </div>
            </div>
            
            {/* Date Selection */}
            <div className="date-selector">
              {dates.map((item, index) => (
                <div 
                  key={index} 
                  className={`date-item ${currentDate === item.date ? 'date-selected' : ''}`}
                  onClick={() => handleDateSelect(item.date)}
                >
                  <div className="date-day">{item.day}</div>
                  <div className={`date-number ${currentDate === item.date ? 'date-number-selected' : ''}`}>{item.date}</div>
                </div>
              ))}
            </div>
            
            {/* Search Bar */}
            <div className="search-container">
              <div className="search-box">
                <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search Dates" 
                  className="search-input"
                />
              </div>
            </div>
            
            {/* Cinema List */}
            <div className="cinema-list">
              <div className="cinema-card expanded">
                <div className="cinema-header">
                  <div className="cinema-brand">
                    <div className="cinema-logo">CGV</div>
                    <div className="cinema-name">SM Lucena</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="chevron-up" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                
                <div className="cinema-details">
                  <div className="ticket-info">
                    <div className="ticket-type">Regular</div>
                    <div className="ticket-price">Php. 250.00</div>
                  </div>
                  <div className="time-slots">
                    {timeSlots.map((slot, index) => (
                      <button 
                        key={index} 
                        className={`time-slot ${slot.selected ? 'time-selected' : ''}`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="cinema-card">
                <div className="cinema-header">
                  <div className="cinema-brand">
                    <div className="cinema-logo">CGV</div>
                    <div className="cinema-name">SM LUCENA</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="chevron-down" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="cinema-card">
                <div className="cinema-header">
                  <div className="cinema-brand">
                    <div className="cinema-logo pacific">PMC</div>
                    <div className="cinema-name">PACIFIC MALL</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="chevron-down" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right panel - Seat Selection */}
        <div className="panel">
          <div className="panel-content">
            {/* Top Navigation */}
            <div className="top-nav">
              <button className="icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="logo-text">Movie Watch</div>
              <div className="user-controls">
                <button className="icon-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <div className="user-avatar"></div>
              </div>
            </div>
            
            {/* Seat Selection Section */}
            <div className="seat-section">
              {/* Screen */}
              <div className="screen-container">
                <div className="screen"></div>
                <div className="screen-label">SCREEN</div>
              </div>
              
              {/* Seats Grid */}
              <div className="seats-grid">
                {initialSeatMap.map((row, rowIndex) => (
                  row.map((seat, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        seat
                        ${seat === '' ? 'seat-empty' : 
                          seatStatus[rowIndex][colIndex] === 1 ? 'seat-reserved' : 
                          seatStatus[rowIndex][colIndex] === 2 ? 'seat-selected' : 
                          'seat-available'}
                      `}
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      disabled={seat === '' || seatStatus[rowIndex][colIndex] === 1}
                    >
                      {seat}
                    </button>
                  ))
                ))}
              </div>
              
              {/* Legend */}
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color seat-available"></div>
                  <span className="legend-text">Seat</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color seat-reserved"></div>
                  <span className="legend-text">Taken</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color seat-taken"></div>
                  <span className="legend-text">Reserved</span>
                </div>
              </div>
              
              {/* Cinema Info */}
              <div className="cinema-info">
                <svg xmlns="http://www.w3.org/2000/svg" className="ticket-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <div className="cinema-title">SM LUCENA</div>
              </div>
              
              {/* Details */}
              <div className="details-grid">
                <div className="detail-card">
                  <div className="detail-label">PHP</div>
                  <div className="detail-value">250.00</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">DATE</div>
                  <div className="detail-value">{currentDate} June</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">STATUS</div>
                  <div className="detail-value">Regular</div>
                </div>
              </div>
              
              {/* Selected Seats Summary */}
              <div className="summary">
                <div className="summary-row">
                  <div className="summary-label">{selectedSeats.length} Seats Selected</div>
                  <div className="summary-value">{selectedSeats.join(', ')}</div>
                </div>
                <div className="summary-row">
                  <div className="summary-label">Total</div>
                  <div className="summary-value total">PHP {totalPrice.toFixed(2)}</div>
                </div>
              </div>
              
              {/* Buy Ticket Button */}
              <button className="buy-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSeatReservation;