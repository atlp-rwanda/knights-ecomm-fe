import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginData } from '../../types/registerType';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/actions/registerAction';
import { resetState } from '../../redux/reducers/registerReducer';
import toast from 'react-hot-toast';
import { loginUser } from '../../redux/actions/loginAction';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginData>();

  const dispatch = useDispatch<AppDispatch>();
  const { register: registerResponse, loading, error } = useSelector((state: RootState) => state.register);

  const onSubmit: SubmitHandler<LoginData> = (userData: LoginData) => {
    console.log(userData);

    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetState());
    }
    if (registerResponse) {
      toast.success(registerResponse.data.message);
      reset();
      dispatch(resetState());
    }
  }, [error, registerResponse, dispatch, reset]);

  return (
    <div className="min-h-[85vh] h-auto w-full flex items-center justify-center py-10 px-4  bg-transparent1">
      <form
        method="post"
        action="/login"
        className="min-w-[90%] flex flex-col items-center justify-start gap-y-4 py-10 px-8 md:min-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="min-w-[100%] text-baseBlack text-2xl font-medium">Login</h1>

        <div className="w-full flex flex-col items-start justify-start gap-y-1">
          <p className="text-black1 text-base">Email Address</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-base"
              type="email"
              placeholder="johnDoe@gmail.com"
              {...register('email', { required: true })}
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-1">
          <p className="text-black1 text-base">Password</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-base"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {showPassword ? (
              <EyeOff
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        <p className="text-small w-full text-black1 text-right">
          <a href="/reset-password"> Forgot password? </a>
        </p>
        <button
          type={loading ? 'button' : 'submit'}
          className={`w-full min-h-[50px] flex items-center justify-center bg-primary text-white text-2xl font-medium mt-2 ${loading ? 'cursor-not-allowed' : 'cu'}`}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p className="text-small  text-grey2">
          {"Don't have an account? "}
          <a href="/register" className="ml-1 text-orange">
            Signup here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
