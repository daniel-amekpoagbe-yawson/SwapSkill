import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import SkillDetailPage from "./pages/SkillDeatilsPage";
import NotFound from "./pages/NotFound";
import AppLayOut from "./components/Layout/AppLayOut";
import SkillListingPage from "./pages/SkillListItem";
import SkillUploadForm from "./components/custom/SkillUploadForm";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Contact from "./pages/Contact";
import OurMission from "./pages/OurMission";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<AppLayOut />}>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/SkillListingPage" element={<SkillListingPage />} />
        <Route path="/skills/:id" element={<SkillDetailPage />} />
        <Route path="/skills" element={<SkillListingPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our-mission" element={<OurMission />} />

        {/* Protected routes */}
        <Route
          path="/upload-skill"
          element={
            <ProtectedRoute>
              <SkillUploadForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Auth routes without layout */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
