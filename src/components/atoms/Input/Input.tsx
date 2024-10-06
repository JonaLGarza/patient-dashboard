interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="px-3 py-2 border rounded"
      {...props}
    />
  );
};

export default Input;
