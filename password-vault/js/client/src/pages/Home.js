import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <img className="invert my-5" src="/vaulton-logo.svg" alt="Vaulton." />
      <h1 className="text-5xl font-bold">Your #1 Secure Password Vault.</h1>
      <p>With our secure databases, even we can't access your passwords.</p>
      <div className="flex my-10">
        <Link to="/login">
          <button className="py-3 px-10 rounded-md bg-white text-black font-bold mx-2 hover:bg-neutral-900 hover:text-white">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="py-3 px-10 rounded-md bg-white text-black font-bold hover:bg-neutral-900 hover:text-white">
            Register
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
