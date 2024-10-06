const TableHeaderCell = ({ children }:  {children : React.ReactNode}) => {
  return (
    <th className="px-4 py-2 border bg-gray-200">
      {children}
    </th>
  );
};

export default TableHeaderCell;
