const DashboardLayout = ({ children } : { children : React.ReactNode}) => {
  return (
    <div className="container mx-auto p-4">
      {children}
    </div>
  );
};

export default DashboardLayout;
