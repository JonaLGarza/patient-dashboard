const DashboardLayout = ({ children } : { children : React.ReactNode}) => {
  return (
    <div className="container mx-auto p-4">
      {/* You can add header or sidebar components here */}
      {children}
    </div>
  );
};

export default DashboardLayout;
