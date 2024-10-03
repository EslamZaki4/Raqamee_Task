import { GoPlus } from "react-icons/go";

interface ButtonProps {
  text: string; 
  plusIcon?: boolean;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ text, plusIcon = false, className }) => {
  return (
    <button className={className}>
      {plusIcon && <GoPlus className="lg:text-[14px] md:text-[12px] text-[10px]" />}
      <p className="lg:text-[14px] md:text-[12px] text-[10px]">{text}</p>
    </button>
  );
};

export default Button;
