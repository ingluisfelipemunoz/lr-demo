import "./App.css";
import LoanRequest from "./components/forms/LoanRequest";
import UserForm from "./components/forms/UserForm";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-stone-600 ml-1">
        Solicitud de Prestamo
      </h1>
      {/* <LoanRequest /> */}
      <UserForm />
    </div>
  );
}

export default App;
