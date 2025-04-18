export default function Notifications() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Notification Settings</h2>

      {/* Push Notifications */}
      <div className="p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Push Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-medium">Comments</p>
              <p className="text-sm text-gray-500">
                When someone comments on your posts
              </p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-medium">Tags</p>
              <p className="text-sm text-gray-500">
                When someone tags you in a post
              </p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-medium">Friend Requests</p>
              <p className="text-sm text-gray-500">
                When someone sends you a friend request
              </p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-medium">News Feed Updates</p>
              <p className="text-sm text-gray-500">
                Updates about posts in your news feed
              </p>
            </div>
            <input type="checkbox" className="toggle" />
          </label>
          <label className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-medium">Account Security</p>
              <p className="text-sm text-gray-500">
                Important updates about your account security
              </p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
        </div>
      </div>
    </div>
  );
}
