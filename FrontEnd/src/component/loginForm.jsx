import UseAppContext from "../context/useAppContext";
import Login from "../function/login";

const LoginForm = () => {
  const { addLine, changeChatHeader, changeConn } = UseAppContext();
  const handleButtonClick = (e) => {
    e.preventDefault();
    Login(
      e.target.username.value,
      e.target.password.value,
      addLine,
      changeChatHeader,
      changeConn
    );
  };

  return (
    <div className="login-form">
      <form id="login-form" onSubmit={handleButtonClick}>
        <label htmlFor="username">username:</label>
        <input type="text" id="username" name="username" autoComplete="off" />
        <br />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
