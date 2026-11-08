import { createElement } from "react";
import { StudyProvider } from "./context/StudyContext.jsx";
import Dashboard from "./components/Dashboard.jsx";

// App.js orquestra a aplicação. createElement é o equivalente JavaScript do JSX.
export default function App() {
  return createElement(StudyProvider, null, createElement(Dashboard));
}
