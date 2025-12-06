import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import RenderModal from "./modals/RenderModal/RenderModal";

function App() {
  const theme = useSelector((state) => state.theme.mode); // Grab theme from Redux
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  // This Effect applies the 'dark' attribute to the HTML tag
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <AppRoutes />
      {isModalOpen && <RenderModal />}
    </div>
  );
}

export default App;
