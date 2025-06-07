import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import Login from "./Login";
import Signup from "./signup";

const Auth = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="loginContainer">
      <div className="box h-[30rem] w-[25rem]">
        <div className="minContainer login">
          <div className="loginBox w-full px-10 space-y-5">
            {active ? <Signup /> : <Login />}
            <div>
              <span>Already Have Account</span>
              <Button
                className="cursor-pointer text-lg "
                variant="ghost"
                onClick={() => setActive(!active)}
              >
                {active ? "signin" : "signup"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
