import { Bell, Shield, Smartphone } from "lucide-react";

export default function Security() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Security and Login</h2>

      {/* Two-Factor Authentication */}
      <div className="p-4 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add an extra layer of security to your account
            </p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Login Alerts */}
      <div className="p-4 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg">
            <Bell className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Login Alerts</h3>
            <p className="text-sm text-gray-500 mt-1">
              Get alerts about unrecognized logins
            </p>
            <div className="mt-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="text-sm">Email alerts</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Logins */}
      <div className="p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Recent Logins</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg">
                <Smartphone className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">iPhone 13</p>
                <p className="text-sm text-gray-500">
                  New York, USA • 2 hours ago
                </p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
