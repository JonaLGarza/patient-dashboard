// src/components/organisms/Summary.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import SummaryCard from '../../molecules/SummaryCard/SummaryCard';

const Summary: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.items);

  const totalItems = data.length;
  const totalUsers = new Set(data.map((item: any) => item.userId)).size;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard title="Total Items" value={totalItems} />
      <SummaryCard title="Total Users" value={totalUsers} />
    </div>
  );
};

export default Summary;
