import React, { useState } from 'react';

interface Props {
  onLogin: (username: string, password: string) => void;
}

const Login = ({ onLogin }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="container mx-auto w-full px-6 mt-20">
      <h1 className="text-slate-100 text-xl font-bold">Login</h1>
      <form action="/" method="post">
        <div className="relative">
          <label htmlFor="email" className="block mt-3">
            <span className="text-slate-100 text-sm font-medium tracking-wide">
              Email address
            </span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-1 rounded-md ring-0 border-transparent text-slate-100 placeholder:text-slate-500 bg-slate-750 transition duration-200 ease-in-out hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label htmlFor="password" className="block mt-3">
            <span className="text-slate-100 text-sm font-medium tracking-wide">
              Password
            </span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mt-1 rounded-md ring-0 border-transparent text-slate-100 placeholder:text-slate-500 bg-slate-750 transition duration-200 ease-in-out hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <button
            onClick={() => onLogin(email, password)}
            type="button"
            className="block w-full py-2 mt-6 justify-center border border-transparent text-sm font-medium rounded-md text-slate-50 bg-blue-500 transition duration-200 ease-in-out hover:bg-blue-400 focus:outline-none focus:ring-0 active:bg-blue-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
