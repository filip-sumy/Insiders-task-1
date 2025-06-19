import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabs from "./components/Tabs";

const Dashboard = () => <div>Dashboard Page</div>;
const Banking = () => <div>Banking Page</div>;
const Telefonie = () => <div>Telefonie Page</div>;
const Accounting = () => <div>Accounting Page</div>;
const Verkauf = () => <div>Verkauf Page</div>;
const Statistik = () => <div>Statistik Page</div>;
const PostOffice = () => <div>Post Office Page</div>;
const Administration = () => <div>Administration Page</div>;
const Help = () => <div>Help Page</div>;
const Warenbestand = () => <div>Warenbestand Page</div>;
const Auswahllisten = () => <div>Auswahllisten Page</div>;
const Einkauf = () => <div>Einkauf Page</div>;
const Rechn = () => <div>Rechn Page</div>;


function App() {
  return (
    <BrowserRouter>
      <Tabs />
      <div className="page">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/telefonie" element={<Telefonie />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/verkauf" element={<Verkauf />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/postOffice" element={<PostOffice />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/help" element={<Help />} />
          <Route path="/warenbestand" element={<Warenbestand />} />
          <Route path="/auswahllisten" element={<Auswahllisten />} />
          <Route path="/einkauf" element={<Einkauf />} />
          <Route path="/rechn" element={<Rechn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
