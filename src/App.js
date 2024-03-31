import "./App.css";
import LoanRequest from "./components/forms/LoanRequest";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-stone-600 ml-1">
        Solicitud de Prestamo
      </h1>
      <LoanRequest />
    </div>
  );
}

export default App;
