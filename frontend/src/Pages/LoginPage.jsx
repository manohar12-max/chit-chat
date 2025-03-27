import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault();
    if( !password || !email){
        alert("Please fill all fields");
        return;
    }
    setLoading(true);
    try{
        const config={
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const {data} = await axios.post("https://chit-chat-1-t3my.onrender.com/api/user/login", { email, password},config);
        console.log(data);
        localStorage.setItem("userInfo",JSON.stringify(data))
        navigate("/chats")
    }
    catch(err) {
        console.log(err);
        setLoading(false);
    }
  };

  return (
    <div className="   h-screen w-full flex flex-col items-center justify-center px-4 bg-green-200">
      <div className="p-4  rounded-2xl bg-green-400 border-[2px] border-green-500 md:max-w-[500px] md:max-h-[500px] max-w-[400px] max-h-[500px] w-full h-full w-500px">
        <h1 className="p-4 bg-green-50 rounded-2xl font-bold text-green-700 md:text-2xl">
          Welcome To Chit-Chat
        </h1>
        <form action="" onSubmit={onSubmit}>
        <div className="flex flex-col h-full items-center mt-20 gap-4  ">
         
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
             onChange={(e)=>{setEmail(e.target.value)}}
              className="border-2 w-full border-white"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
             onChange={(e)=>{setPassword(e.target.value)}}
              className="border-2 w-full border-white"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
            />
          </div>
         
          <Button
                        disabled={loading}
                        type="submit"
                        className=" cursor-pointer w-full max-w-sm  mt-3 bg-green-950 mx-2 "
                      >
                        {
                          loading ? (
                            <span className="animate-spin text-green-400"><LoaderCircle/></span>
                          ) : (
                            "LogIn"
                          )
                        }
                      </Button>
          <p className=" text-center">
            Already have an account ?{" "}
            <span className="underline cursor-pointer">
              <a href="/signup">click here</a>
            </span>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
