import "bootstrap/dist/css/bootstrap.min.css";
import { useState, createContext } from "react";
import LoginOrRegister from "./components/pages/login";
import Layout from "./components/layouts";


export const AppContext = createContext();
function App() {
  const [user, setUser] = useState(localStorage.getItem("user") == undefined ? null : JSON.parse(localStorage.getItem("user")));

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {!user ? <LoginOrRegister /> : <Layout />}
    </AppContext.Provider>
  );
}
     
export default App;
