import { useNavigate, useOutletContext } from "react-router-dom";
import type { AppContextInterface } from "../types/appContext.type";

function Dashboard() {

  const navigate = useNavigate();
  const { user } = useOutletContext<AppContextInterface>();

  return (
    <>
      <p>Bonjour : {user?.email}</p>
      <button type="button" onClick={() => navigate("/dashboard/albums")}>Ajouter un album</button>
    </>
  )
}

export default Dashboard;