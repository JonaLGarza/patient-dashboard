import React from "react";

interface TableRowProps {
  item: {
    userId: number;
    name: string;
    gender: string;
    age: number;
    bloodPressure: number;
    heartRate: number;
    oxygenLevel: number;
    temperature: number;
    diagnosis: string;
    medications: string[];
    allergies: string[];
    admissionDate: string;
  };
}

const TableRow: React.FC<TableRowProps> = React.memo(({ item }) => {
  return (
    <>    
      <div className="w-1/12 px-4 py-2 border">{item.userId}</div>
      <div className="w-2/12 px-4 py-2 border">{item.name}</div>
      <div className="w-1/12 px-4 py-2 border">{item.age}</div>
      <div className="w-1/12 px-4 py-2 border">{item.gender}</div>
      <div className="w-1/12 px-4 py-2 border">{item.bloodPressure}</div>
      <div className="w-1/12 px-4 py-2 border">{item.heartRate}</div>
      <div className="w-1/12 px-4 py-2 border">{item.oxygenLevel}</div>
      <div className="w-1/12 px-4 py-2 border">{item.temperature}</div>
      <div className="w-2/12 px-4 py-2 border">{item.diagnosis}</div>
      <div className="w-2/12 px-4 py-2 border">
        {item.medications.join(', ')}
      </div>
      <div className="w-2/12 px-4 py-2 border">
        {item.allergies.join(', ')}
      </div>
    </>
  );
});

export default TableRow;
