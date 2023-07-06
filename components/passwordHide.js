import { useState } from "react";

const PasswordShowHide = ({ field }) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);

  return (
    <>
        <input
            type={showHidePassword ? "text" : "password"}
            {...field}
        />
        <div>
            <label style={{ marginRight: "5px"}} htmlFor="checkbox">Show password</label>
            <input type="checkbox" name="checkbox" onClick={() => changeShowHidePassword(!showHidePassword)}/>
        </div>
    </>
  );
};

export default PasswordShowHide;