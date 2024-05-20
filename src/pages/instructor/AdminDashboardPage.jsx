import AdminDashboard from "../../components/instructors/AdminDashboard";
import CourseCard from "../../components/instructors/CourseCard";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminDashboard />
      <main>
        <CourseCard />
      </main>
    </div>
  );
};

export default AdminDashboardPage;