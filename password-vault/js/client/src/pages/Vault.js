import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import PasswordItem from "./PasswordItem";

const Vault = () => {
  const [vault, setVault] = useState([]);
  const [passwordItem, setPasswordItem] = useState({
    label: "",
    password: "",
  });
  const [searchedLabel, setSearchedLabel] = useState("");

  const populateVault = () => {
    axios
      .get("http://localhost:3001/api/vault", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setVault(res.data.vault);
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateVault();
      }
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/api/vault",
        { vault: vault },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.status === "ok") {
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log("scoopy di poop");
      });
  }, [vault]);

  const addPassword = (e) => {
    e.preventDefault();
    setVault((prevItems) => {
      return [...prevItems, passwordItem];
    });
    setPasswordItem({
      label: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPasswordItem((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSearch = (e) => {
    const searchedValue = e.target.value;
    setSearchedLabel(searchedValue);
  };

  const filteredVault = vault.filter((password) => {
    return password.label.toLowerCase().includes(searchedLabel.toLowerCase());
  });

  return (
    <div className="h-screen bg-black text-white p-20">
      <h1 className="text-4xl font-bold text-center mb-10">Password Vault</h1>
      <form className="flex flex-col w-1/4 mx-auto" onSubmit={addPassword}>
        <label htmlFor="label">Label</label>
        <input
          className="rounded bg-neutral-800 py-3 mb-5"
          type="text"
          value={passwordItem.label}
          name="label"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          className="rounded bg-neutral-800 py-3"
          type="text"
          value={passwordItem.password}
          name="password"
          onChange={handleChange}
        />
        <button className="bg-blue-900 hover:bg-blue-800 outline-none border-none mx-auto px-10 py-3 font-bold rounded-md my-10">
          Add Password
        </button>
      </form>
      <div className="flex flex-col justify-center items-center">
        <input
          className="rounded bg-neutral-800 p-3 mb-10"
          onChange={handleSearch}
          value={searchedLabel}
          placeholder="Search for label of the password..."
        />
        {filteredVault.map((password) => {
          return (
            <PasswordItem
              key={password._id}
              label={password.label}
              password={password.password}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Vault;
