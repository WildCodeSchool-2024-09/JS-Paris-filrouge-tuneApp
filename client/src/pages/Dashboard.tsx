import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/dashboard/albums")}>Ajouter un album</button>
    </>
  )
}

export default Dashboard;