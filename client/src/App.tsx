import { Outlet, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";

// import { user } from "./assets/data";

const Layout = () => {
  const { user } = useSelector((state) => state.user);

  console.log(user, `<---- user from redux`);

  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  const { theme } = useSelector((state) => state.theme);

  console.log(theme, `<---- theme from redux`);

  return (
    <div className="bg-bgColor h-screen text-center">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
