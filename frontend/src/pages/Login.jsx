import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await login({ email: email.value, password: password.value });

    if (!error) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        console.log("Login success", user);
        setIsAuthenticated(true);
        navigate("/");
      }
    } else {
      console.log("Login failed", error);
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input {...email} />

        <label>Password:</label>
        <input {...password} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
