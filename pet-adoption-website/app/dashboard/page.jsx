import NavBar from "../../components/navbar";
import DashboardContent from "../../components/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="bg-[#fcf7ee] min-h-screen">
      <header>
        <NavBar />
      </header>

      <DashboardContent />
    </div>
  );
}
