import { FormEvent, useState } from "react";
import { useLoginUser_ApiMutation } from "../redux/api/authApi"
import { Decode_JWT_Token } from "../utils/decodeJwtToken";
import { Login_User } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner'


const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFnc, { data }] = useLoginUser_ApiMutation();
  const dispatch = useAppDispatch();
  const navitate = useNavigate()

  const handleLoginPage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await loginFnc({ email, password }).unwrap();
      const user = Decode_JWT_Token(res.data.AccessToken);
      dispatch(Login_User({user,token:res.data.AccessToken}));
      navitate('/');
    } catch (err:any) {
      console.log(err);
      toast.error(err.data.errorTitle,{position:'top-center'})
    }
  }


  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleLoginPage} className="p-3 -mt-16 flex flex-col space-y-5 min-w-[320px] sm:min-w-[400px]">
        <h1 className="text-center text-xl font-semibold uppercase text-blue-400">Login Page</h1>
        <div className=" w-full">
          <small className="text-blue-400">Email</small><br />
          <input onChange={e => setEmail(e.target.value)} value={email} className="outline-none px-3 w-full rounded-lg text-lg border border-blue-200" type="email" placeholder="@gmail.com" name="email" />
        </div>
        <div className=" w-full">
          <small className="text-blue-400">Password</small><br />
          <input onChange={e => setPassword(e.target.value)} value={password} className="outline-none px-3 w-full rounded-lg text-lg border border-blue-200" type="text" placeholder="..." name="password" />
        </div>
        <div>
          <button className="btn w-full btn-sm hover:bg-blue-500 bg-blue-400 text-white">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage