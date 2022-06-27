import { useState } from "react";

const PasswordItem = ({ label, password }) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="flex justify-center text-center py-2">
      <h3 className="font-bold pr-5">{label}</h3>
      <p>{isHidden ? "●●●●●●●●" : password}</p>
      <img
        className="w-6 invert ml-3 cursor-pointer"
        src={isHidden ? "/eye-closed.svg" : "/eye-opened.svg"}
        alt="Show/Hide password."
        onClick={() => setIsHidden((prevValue) => !prevValue)}
      />
    </div>
  );
};

export default PasswordItem;
