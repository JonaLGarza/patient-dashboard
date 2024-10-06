import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { PatientData } from '../../../store/slices/dataSlice';

interface TableRowProps {
  item: PatientData;
  onClick: (patient: PatientData) => void;
}

const normalRanges = {
  bloodPressure: { min: 90, max: 120 },
  heartRate: { min: 60, max: 100 },
  oxygenLevel: { min: 95, max: 100 },
  temperature: { min: 36.5, max: 37.5 },
};

const isAbnormal = (value: number, range: { min: number; max: number }) =>
  value < range.min || value > range.max;

const hasAbnormalVital = (item: PatientData) =>
  isAbnormal(item.bloodPressure, normalRanges.bloodPressure) ||
  isAbnormal(item.heartRate, normalRanges.heartRate) ||
  isAbnormal(item.oxygenLevel, normalRanges.oxygenLevel) ||
  isAbnormal(item.temperature, normalRanges.temperature);

const TableRow: React.FC<TableRowProps> = React.memo(({ item, onClick } : {item: any, onClick: any}) => {
  return (
    <>
      {/* For medium and larger screens */}
      <div
        className={`hidden md:flex ${
          hasAbnormalVital(item) ? 'bg-red-100' : 'hover:bg-gray-100'
        } cursor-pointer`}
        onClick={() => onClick(item)}
      >
        <div className="w-1/12 px-4 py-2 border">{item.userId}</div>
        <div className="w-2/12 px-4 py-2 border">{item.name}</div>
        <div className="w-1/12 px-4 py-2 border">{item.age}</div>
        <div className="w-1/12 px-4 py-2 border">{item.gender}</div>

        {/* Blood Pressure with conditional styling */}
        <div
          className={`w-1/12 px-4 py-2 border flex items-center justify-center ${
            isAbnormal(item.bloodPressure, normalRanges.bloodPressure)
              ? 'text-red-500 font-bold'
              : ''
          }`}
        >
          {item.bloodPressure}
          {isAbnormal(item.bloodPressure, normalRanges.bloodPressure) && (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-1" />
          )}
        </div>

        {/* Heart Rate with conditional styling */}
        <div
          className={`w-1/12 px-4 py-2 border flex items-center justify-center ${
            isAbnormal(item.heartRate, normalRanges.heartRate)
              ? 'text-red-500 font-bold'
              : ''
          }`}
        >
          {item.heartRate}
          {isAbnormal(item.heartRate, normalRanges.heartRate) && (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-1" />
          )}
        </div>

        {/* Oxygen Level with conditional styling */}
        <div
          className={`w-1/12 px-4 py-2 border flex items-center justify-center ${
            isAbnormal(item.oxygenLevel, normalRanges.oxygenLevel)
              ? 'text-red-500 font-bold'
              : ''
          }`}
        >
          {item.oxygenLevel}
          {isAbnormal(item.oxygenLevel, normalRanges.oxygenLevel) && (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-1" />
          )}
        </div>

        {/* Temperature with conditional styling */}
        <div
          className={`w-1/12 px-4 py-2 border flex items-center justify-center ${
            isAbnormal(item.temperature, normalRanges.temperature)
              ? 'text-red-500 font-bold'
              : ''
          }`}
        >
          {item.temperature}
          {isAbnormal(item.temperature, normalRanges.temperature) && (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-1" />
          )}
        </div>

        <div className="w-2/12 px-4 py-2 border">{item.diagnosis}</div>
        <div className="w-2/12 px-4 py-2 border">
          {item.medications.join(', ')}
        </div>
        <div className="w-2/12 px-4 py-2 border">
          {item.allergies.join(', ')}
        </div>
      </div>

      {/* For small screens */}
      <div
        className={`md:hidden flex flex-col border mb-4 p-2 ${
          hasAbnormalVital(item) ? 'bg-red-100' : ''
        } cursor-pointer`}
        onClick={() => onClick(item)}
      >
        <div className="flex justify-between">
          <span className="font-bold">ID:</span>
          <span>{item.userId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Name:</span>
          <span>{item.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Age:</span>
          <span>{item.age}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Gender:</span>
          <span>{item.gender}</span>
        </div>

        {/* Blood Pressure with conditional styling */}
        <div className="flex justify-between">
          <span className="font-bold">BP:</span>
          <span
            className={`flex items-center ${
              isAbnormal(item.bloodPressure, normalRanges.bloodPressure)
                ? 'text-red-500 font-bold'
                : ''
            }`}
          >
            {item.bloodPressure}
            {isAbnormal(item.bloodPressure, normalRanges.bloodPressure) && (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-1" />
            )}
          </span>
        </div>

        {/* Heart Rate with conditional styling */}
        <div className="flex justify-between">
          <span className="font-bold">HR:</span>
          <span
            className={`flex items-center ${
              isAbnormal(item.heartRate, normalRanges.heartRate)
                ? 'text-red-500 font-bold'
                : ''
            }`}
          >
            {item.heartRate}
            {isAbnormal(item.heartRate, normalRanges.heartRate) && (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-1" />
            )}
          </span>
        </div>

        {/* Oxygen Level with conditional styling */}
        <div className="flex justify-between">
          <span className="font-bold">O₂ Sat:</span>
          <span
            className={`flex items-center ${
              isAbnormal(item.oxygenLevel, normalRanges.oxygenLevel)
                ? 'text-red-500 font-bold'
                : ''
            }`}
          >
            {item.oxygenLevel}
            {isAbnormal(item.oxygenLevel, normalRanges.oxygenLevel) && (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-1" />
            )}
          </span>
        </div>

        {/* Temperature with conditional styling */}
        <div className="flex justify-between">
          <span className="font-bold">Temp:</span>
          <span
            className={`flex items-center ${
              isAbnormal(item.temperature, normalRanges.temperature)
                ? 'text-red-500 font-bold'
                : ''
            }`}
          >
            {item.temperature}
            {isAbnormal(item.temperature, normalRanges.temperature) && (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 ml-1" />
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold">Diagnosis:</span>
          <span>{item.diagnosis}</span>
        </div>
      </div>
    </>
  );
});

export default TableRow;
