import React from 'react';
import { PatientData } from '../../../store/slices/dataSlice';

interface PatientModalProps {
  patient: PatientData | null;
  onClose: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ patient, onClose }) => {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{patient.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        {/* Patient details */}
        <div className="space-y-2">
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Blood Pressure:</strong> {patient.bloodPressure}
          </p>
          <p>
            <strong>Heart Rate:</strong> {patient.heartRate}
          </p>
          <p>
            <strong>Oxygen Level:</strong> {patient.oxygenLevel}
          </p>
          <p>
            <strong>Temperature:</strong> {patient.temperature}
          </p>
          <p>
            <strong>Diagnosis:</strong> {patient.diagnosis}
          </p>
          <p>
            <strong>Medications:</strong> {patient.medications.join(', ')}
          </p>
          <p>
            <strong>Allergies:</strong> {patient.allergies.join(', ')}
          </p>
          <p>
            <strong>Admission Date:</strong>{' '}
            {new Date(patient.admissionDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
