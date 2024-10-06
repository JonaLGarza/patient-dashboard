const TableCell = ({ children } : { children : React.ReactNode}) => {
  return (
    <td className="px-4 py-2 border">
      {children}
    </td>
  );
};

export default TableCell;
