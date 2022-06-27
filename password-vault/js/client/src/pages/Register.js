import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const registerUser = (e) => {
    axios
      .post("http://localhost:3001/api/register", user)
      .then((res) => {
        if (res.data.status === "ok") {
          navigate("/login");
        } else if (res.data.status === "error") {
          alert(
            "Someone else already has this username. Please pick another one."
          );
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <h2 className="font-bold">Register</h2>
      <div className="flex justify-center items-center py-8">
        <h1 className="text-6xl font-bold mr-5">Vaulton</h1>
        <img
          className="invert"
          src="/vaulton-logo.svg"
          alt="Vaulton."
          width={60}
        />
      </div>
      <p>Your secure vault of passwords.</p>
      <form className="flex flex-col my-10" onSubmit={registerUser}>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          className="rounded bg-neutral-800 py-3"
          name="username"
          value={user.username}
          type="text"
        />
        <label className="mt-5" htmlFor="password">
          Password
        </label>
        <input
          onChange={handleChange}
          className="rounded bg-neutral-800 py-3"
          name="password"
          value={user.password}
          type="password"
        />
        <button className="py-4 px-10 bg-white hover:bg-neutral-900 hover:text-white text-black rounded-lg mx-auto mt-5 font-bold">
          Register
        </button>
        <Link to="/register">
          <p className="text-center pt-4">Or login to existing account</p>
        </Link>
      </form>
    </main>
  );
};

export default Register;
