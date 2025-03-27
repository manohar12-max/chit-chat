import React, { useState } from "react";
import Loginpage from "../_components/LoginPage";
import SignUppage from "../_components/SignUppage";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 bg-green-200">
      {isLogin ? (
        <Loginpage isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <SignUppage isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Auth;
