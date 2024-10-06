interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button
      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
