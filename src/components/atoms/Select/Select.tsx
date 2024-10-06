interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({ options, label, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm text-gray-700">{label}</label>}
      <select className="px-3 py-2 border rounded" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
