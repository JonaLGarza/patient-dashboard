// websocket-server/server.js
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

const medicationsList = [
    'Aspirin',
    'Metformin',
    'Lisinopril',
    'Atorvastatin',
    'Albuterol',
    'Metoprolol',
    'Omeprazole',
    'Amoxicillin',
    'Prednisone',
    'Warfarin',
];
  
const diagnoses = [
    'Hypertension',
    'Diabetes',
    'Asthma',
    'Cardiovascular Disease',
    'COPD',
    'Cancer',
    'Kidney Disease',
    'Liver Disease',
    'Anemia',
    'Thyroid Disorder',
];


server.listen(8080, () => {
  console.log('Websocket server is running on ws://localhost:8080');
});

io.on('connection', (socket) => {
  console.log('A new client connected.');

  const sendDataInterval = setInterval(() => {
    const data = generateRandomPatientDataArray();
    socket.emit('patientData', data);
  }, 100);

  socket.on('disconnect', () => {
    clearInterval(sendDataInterval);    
    console.log('Client disconnected.');
  });
});

function generateRandomPatientDataArray() {
    const data = [];
    for (let userId = 1; userId <= 100; userId++) {
      data.push({
        userId,
        temperature: parseFloat((Math.random() * 2 + 36).toFixed(1)), // Random temp between 36.0 and 38.0
        bloodPressure: Math.floor(Math.random() * 80) + 60,
        heartRate: Math.floor(Math.random() * 60) + 60,
        oxygenLevel: Math.floor(Math.random() * 10) + 90,
        // Fields that might change over time
        medications: [
          medicationsList[Math.floor(Math.random() * medicationsList.length)],
        ],
        diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
        // For the sake of example, let's assume diagnosis and medications can change
      });
    }
    return data;
  }