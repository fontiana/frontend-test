import { IconProps } from "@mui/material";
import { ReactElement } from "react";

const Icon: React.FC<{
  icon: ReactElement<IconProps>;
  onClick?: () => void;
}> = ({ icon, onClick, ...props }) => {
  return (
    <div
      {...props}
      onClick={onClick}
      className="w-8 h-8 rounded cursor-pointer bg-black text-white p-1 flex justify-center items-center"
    >
      {icon}
    </div>
  );
};

export default Icon;
