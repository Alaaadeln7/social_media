export default function Privacy() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Privacy Settings</h2>

      {/* Post Privacy */}
      <div className="p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Who can see your posts?</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="post-privacy"
              className="text-blue-600"
              defaultChecked
            />
            <div>
              <p className="font-medium">Public</p>
              <p className="text-sm text-gray-500">Anyone on or off Facebook</p>
            </div>
          </label>
          <label className="flex items-center space-x-3">
            <input type="radio" name="post-privacy" className="text-blue-600" />
            <div>
              <p className="font-medium">Friends</p>
              <p className="text-sm text-gray-500">Your friends on Facebook</p>
            </div>
          </label>
          <label className="flex items-center space-x-3">
            <input type="radio" name="post-privacy" className="text-blue-600" />
            <div>
              <p className="font-medium">Only me</p>
              <p className="text-sm text-gray-500">
                Only you can see your posts
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Profile Information */}
      <div className="p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Profile Information Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Address</p>
              <p className="text-sm text-gray-500">
                Who can see your email address?
              </p>
            </div>
            <select className="rounded-lg border-gray-300">
              <option>Only me</option>
              <option>Friends</option>
              <option>Public</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Phone Number</p>
              <p className="text-sm text-gray-500">
                Who can see your phone number?
              </p>
            </div>
            <select className="rounded-lg border-gray-300">
              <option>Only me</option>
              <option>Friends</option>
              <option>Public</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
