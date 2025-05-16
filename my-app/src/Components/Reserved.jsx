import { useState, useEffect } from 'react';

const MovieSeatReservation = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentDate, setCurrentDate] = useState(24);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const initialSeatMap = [
    ['A1', 'A9', 'A17', 'A25', 'A33', 'A41', 'A13', 'A10'],
    ['A2', 'A10', 'A18', 'A26', 'A34', 'A42', 'A12', 'A10'],
    ['A3', 'A11', 'A19', 'A27', 'A35', 'A43', 'A13', 'A11'],
    ['A4', 'A12', 'A20', 'A28', 'A36', 'A44', 'A12', 'A10'],
    ['A5', 'A13', 'A21', 'A29', 'A37', 'A45', 'A13', 'A10'],
    ['A6', 'A14', 'A22', 'A30', 'A38', 'A46', 'A12', 'A10'],
    ['A7', 'A15', 'A23', 'A31', 'A39', 'A47', 'A12', 'A10'],
    ['A8', 'A16', 'A24', 'A32', 'A40', 'A48', 'A12', 'A10'],
  ];

  const initialSeatStatus = Array(8).fill().map(() => Array(8).fill(0));
  // Mark some seats as taken (1)
  initialSeatStatus[0][0] = 1;
  initialSeatStatus[0][2] = 1;
  initialSeatStatus[1][2] = 1;
  initialSeatStatus[2][0] = 1;
  initialSeatStatus[2][2] = 1;
  initialSeatStatus[4][0] = 1;
  initialSeatStatus[4][2] = 1;
  initialSeatStatus[5][2] = 1;

  const [seatStatus, setSeatStatus] = useState(initialSeatStatus);

  const dates = [
    { day: 'Wed', date: 21 },
    { day: 'Thu', date: 22 },
    { day: 'Fri', date: 23 },
    { day: 'Sat', date: 24 },
    { day: 'Sun', date: 25 },
    { day: 'Mon', date: 26 },
    { day: 'Tue', date: 27 },
  ];

  const timeSlots = ['13:00', '16:00', '18:30', '21:00'];

  // Load saved reservation from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("movieReservation");
    if (saved) {
      const { selectedSeats, currentDate, selectedTimeSlot } = JSON.parse(saved);
      setSelectedSeats(selectedSeats || []);
      setCurrentDate(currentDate || 24);
      setSelectedTimeSlot(selectedTimeSlot || null);

      // Mark selected seats in seatStatus as reserved (2)
      const newStatus = initialSeatStatus.map(row => [...row]);
      selectedSeats?.forEach(seat => {
        for (let r = 0; r < initialSeatMap.length; r++) {
          for (let c = 0; c < initialSeatMap[r].length; c++) {
            if (initialSeatMap[r][c] === seat) {
              newStatus[r][c] = 2;
            }
          }
        }
      });
      setSeatStatus(newStatus);
      setTotalPrice((selectedSeats?.length || 0) * 250);
    }
  }, []);

  // Save reservation to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem(
      "movieReservation",
      JSON.stringify({ selectedSeats, currentDate, selectedTimeSlot })
    );
  }, [selectedSeats, currentDate, selectedTimeSlot]);

  const handleSeatClick = (row, col) => {
    if (
      initialSeatMap[row][col] === "" ||
      seatStatus[row][col] === 1
    )
      return;

    const seatId = initialSeatMap[row][col];
    const newSeatStatus = seatStatus.map((row) => [...row]);

    // Seat limit max 6
    if (newSeatStatus[row][col] === 0 && selectedSeats.length >= 6) {
      alert("You can only select up to 6 seats.");
      return;
    }

    if (newSeatStatus[row][col] === 0) {
      newSeatStatus[row][col] = 2;
      setSelectedSeats([...selectedSeats, seatId]);
      setTotalPrice(totalPrice + 250);
    } else if (newSeatStatus[row][col] === 2) {
      newSeatStatus[row][col] = 0;
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      setTotalPrice(totalPrice - 250);
    }
    setSeatStatus(newSeatStatus);
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
  };

  const clearSelection = () => {
    const resetStatus = seatStatus.map(row =>
      row.map(cell => (cell === 2 ? 0 : cell))
    );
    setSeatStatus(resetStatus);
    setSelectedSeats([]);
    setTotalPrice(0);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-red-500 p-4 gap-4">
      <div className="w-full md:w-1/2 bg-gray-900 text-white rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="italic">Movie Watch</div>
          <div className="flex gap-2 items-center">
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2">
          {dates.map(({ day, date }) => (
            <div
              key={date}
              className={`flex flex-col items-center px-3 py-2 rounded-md cursor-pointer ${
                currentDate === date ? "bg-white text-black" : "bg-black bg-opacity-30 text-white"
              }`}
              onClick={() => handleDateSelect(date)}
            >
              <div>{day}</div>
              <div>{date}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="bg-white text-black p-4 rounded shadow">
            <div className="font-bold mb-2">SM Lucena - Regular (Php. 250.00)</div>
            <div className="flex gap-2">
              {timeSlots.map((time, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTimeSlot(time)}
                  className={`px-4 py-2 rounded ${
                    selectedTimeSlot === time ? "bg-red-500 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={clearSelection}
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-gray-900 text-white rounded-lg p-4 flex flex-col">
        <div className="text-center text-lg font-bold mb-2">SCREEN</div>
        <div className="grid grid-cols-8 gap-2 mb-4">
          {initialSeatMap.map((row, rowIndex) =>
            row.map((seat, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`transition-colors duration-300 ease-in-out px-2 py-1 rounded text-sm
                  ${seat === ""
                    ? "invisible"
                    : seatStatus[rowIndex][colIndex] === 1
                    ? "bg-red-700"
                    : seatStatus[rowIndex][colIndex] === 2
                    ? "bg-green-500"
                    : "bg-gray-500"}
                `}
                onClick={() => handleSeatClick(rowIndex, colIndex)}
                disabled={seat === "" || seatStatus[rowIndex][colIndex] === 1}
                title={seat}
              >
                {seat}
              </button>
            ))
          )}
        </div>

        <div className="flex justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-500 rounded-sm"></div> Seat
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-700 rounded-sm"></div> Taken
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div> Reserved
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-800 p-2 rounded text-center">
            <div className="text-sm">PHP</div>
            <div className="text-lg font-bold">250.00</div>
          </div>
          <div className="bg-gray-800 p-2 rounded text-center">
            <div className="text-sm">DATE</div>
            <div className="text-lg font-bold">{currentDate} June</div>
          </div>
          <div className="bg-gray-800 p-2 rounded text-center">
            <div className="text-sm">STATUS</div>
            <div className="text-lg font-bold">Regular</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm">
            {selectedSeats.length} Seats Selected: {selectedSeats.join(", ") || "None"}
          </div>
          <div className="text-lg font-bold">Total: PHP {totalPrice.toFixed(2)}</div>
        </div>

        <button
          onClick={() => setShowSummary(true)}
          disabled={selectedSeats.length === 0 || !selectedTimeSlot}
          className={`flex items-center justify-center gap-2 ${
            selectedSeats.length === 0 || !selectedTimeSlot
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white py-2 px-4 rounded`}
          title={
            selectedSeats.length === 0
              ? "Select seats first"
              : !selectedTimeSlot
              ? "Select a time slot"
              : "Buy Ticket"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          Reserve Ticket
        </button>
      </div>

      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-96 max-w-full">
            <h2 className="text-xl font-bold mb-4">Reservation Summary</h2>
            <p>
              <strong>Date:</strong> {currentDate} June
            </p>
            <p>
              <strong>Time:</strong> {selectedTimeSlot}
            </p>
            <p>
              <strong>Seats:</strong> {selectedSeats.join(", ")}
            </p>
            <p>
              <strong>Total:</strong> PHP {totalPrice.toFixed(2)}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowSummary(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Tickets confirmed! Enjoy your movie!");
                  setShowSummary(false);
                  clearSelection();
                  setSelectedTimeSlot(null);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSeatReservation;
