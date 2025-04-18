import { useState } from "react";
import {
  Settings,
  Lock,
  Bell,
  Languages,
  Eye,
  ArrowLeft,
  Search,
  ChevronRight,
  Palette,
} from "lucide-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import General from "./General";
import Security from "./Security";
import Privacy from "./Privacy";
import Notifications from "./Notifications";
import Theme from "./Theme";
import UpdateProfileInfo from "./UpdateProfileInfo";
function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const navigate = useNavigate();
  const sections = [
    { id: "general", icon: Settings, label: "General" },
    {
      id: "security",
      icon: Lock,
      label: "Security and Login",
    },
    { id: "privacy", icon: Eye, label: "Privacy" },
    {
      id: "notifications",
      icon: Bell,
      label: "Notifications",
    },
    {
      id: "language",
      icon: Languages,
      label: "Language",
    },
    {
      id: "theme",
      icon: Palette,
      label: "theme",
    },
  ];
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className=" shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="ml-4 text-xl font-semibold">Settings</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search settings"
                className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full sm:w-80 flex-shrink-0">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    navigate(`/settings/${section.id}`);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-base-100 text-base-600"
                      : "hover:bg-base-100"
                  }`}
                >
                  <section.icon className={`h-5 w-5 text-blue-600`} />
                  <span className="flex-1 text-left">{section.label}</span>
                  <ChevronRight
                    className={`h-5 w-5 ${
                      activeSection === section.id
                        ? "text-blue-600"
                        : "text-base-400"
                    }`}
                  />
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1  rounded-xl shadow-sm p-6">
            <Routes>
              <Route path="/" element={<General />} />
              <Route path="/general" element={<General />} />
              <Route path="/security" element={<Security />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/language" element={<Languages />} />
              <Route path="/theme" element={<Theme />} />
              <Route
                path="/update-profile-info"
                element={<UpdateProfileInfo />}
              />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
