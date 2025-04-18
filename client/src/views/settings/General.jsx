import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function General() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">General Account Settings</h2>
      <div className="flex items-center justify-between p-4 rounded-lg transition-colors">
        <div>
          <h3 className="font-medium">Name</h3>
          <p className="text-sm text-gray-500">{user?.fullName}</p>
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-center justify-between p-4 rounded-lg transition-colors">
        <div>
          <h3 className="font-medium">Contact</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-500">{user?.phone}</p>
        </div>
      </div>

      {/* Password */}
      <div className="flex items-center justify-between p-4 rounded-lg transition-colors">
        <div>
          <h3 className="font-medium">Password</h3>
          <p className="text-sm text-gray-500">Last changed 3 months ago</p>
        </div>
      </div>

      {/* Language */}
      <div className="flex items-center justify-between p-4 rounded-lg transition-colors">
        <div>
          <h3 className="font-medium">Language</h3>
          <p className="text-sm text-gray-500">English (US)</p>
        </div>
      </div>
      <div className="text-center">
        <Link
          className="btn btn-primary text-white "
          to="/settings/update-profile-info"
        >
          edit info
        </Link>
      </div>
    </div>
  );
}
