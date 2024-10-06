// src/containers/Dashboard.tsx
import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useUserPreferences } from '../hooks/useUserPreferences';
import DashboardLayout from '../components/layout/DasbboardLayout/DashboardLayout';
import Filters from '../components/organisms/Filters/Filters';
import Summary from '../components/organisms/Summary/Summary';
import Table from '../components/organisms/Table/Table';
import { useFetchData } from '../hooks/useFetchData';

const Dashboard: React.FC = () => {
  useFetchData();
  useWebSocket();
  useUserPreferences();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Filters />
        <Summary />
        <Table />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
