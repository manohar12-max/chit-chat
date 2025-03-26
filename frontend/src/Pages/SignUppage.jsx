import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUppage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loadingPic, setLoadingPic] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const postDetails = (picture) => {
    setLoadingPic(true);
    if (picture == undefined) {
      console.log("Error");
      setLoadingPic(false);
      return;
    }
    if (picture.type == "image/jpeg" || picture.type == "image/png") {
        const formData = new FormData();
        formData.append("file", picture);
        formData.append("upload_preset", "chat-app");
        formData.append("cloud_name","dl3vmwyzy");
        fetch("https://api.cloudinary.com/v1_1/dl3vmwyzy/image/upload",{
            method: "POST",
            body: formData,
        }).then((res)=>res.json())
        .then((data)=>{
            setPic(data.url.toString())
            console.log(data);
            setLoadingPic(false);
        })
        .catch((err)=>{console.log(err); setLoadingPic(false)})
         
    }else{
        console.log("Invalid file type");
        setLoadingPic(false);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if(!name || !password || !email){
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
        const {data} = await axios.post("http://localhost:5000/api/user", {name, email, password, pic},config);
       
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
        <h1 className="p-4 bg-green-50 rounded-2xl font-bold text-green-700 md:text-2xl ">
          Welcome To Chit-Chat
        </h1>
        <form action="" onSubmit={onSubmit}>
          <div className="flex flex-col h-full items-center mt-2 gap-4  ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
              required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="border-2 w-full border-white"
                type="text"
                id="name"
                placeholder="Name"
                value={name}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
              required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border-2 w-full border-white"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label className="bg-green-700 w-fit text-white p-2 rounded cursor-pointer">
               {
                loadingPic? (
                  <span className="animate-spin text-green-400">Uploading Pic..</span>
                ) : (
                  "Upload Profile Picture"
                )
               }
                <input
                  disabled={loadingPic}
                  onChange={(e) => postDetails(e.target.files[0])}
                  type="file"
                  className="hidden"
                />
              </label>
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
                  "Sign up"
                )
              }
            </Button>
            <p className=" text-center">
              Already have an account ?{" "}
              <span className="underline cursor-pointer">
                <a href="/login">click here</a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUppage;
