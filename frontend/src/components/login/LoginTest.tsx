import { useState } from 'react';
import { Search, Music2, Bell, Edit2 } from 'lucide-react';

const MusicProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [settings, setSettings] = useState({
    email: '**************@gmail.com',
    viewProfile: 'Everyone',
    viewPlaylists: 'Everyone',
    canFollow: 'Everyone',
    viewAlbum: 'Everyone',
    notificationReminder: 'Everyone'
  });

  const handleSettingChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    setSettings({
      email: '**************@gmail.com',
      viewProfile: 'Everyone',
      viewPlaylists: 'Everyone',
      canFollow: 'Everyone',
      viewAlbum: 'Everyone',
      notificationReminder: 'Everyone'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Music2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">MMusic</span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Discover</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Top music</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Artist</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Category</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-gray-800 rounded-full px-6 py-2 pr-10 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold">Anonymous</h1>
              <Edit2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>follower: 0</span>
              <span>following: 0</span>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-2 rounded-full font-semibold transition-all">
            Follow
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          {['Albums', 'Playlists', 'Account'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all relative ${activeTab === tab
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
                }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
              )}
            </button>
          ))}
        </div>

        {/* Settings Grid */}
        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-center justify-between">
            <label className="text-gray-300 font-medium">Email</label>
            <div className="w-96 bg-gray-800 px-4 py-3 rounded-lg">
              <span className="text-gray-400">{settings.email}</span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="text-gray-300 font-medium block mb-3">Who can view profile</label>
                <select
                  value={settings.viewProfile}
                  onChange={(e) => handleSettingChange('viewProfile', e.target.value)}
                  className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option>Everyone</option>
                  <option>Followers</option>
                  <option>Nobody</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 font-medium block mb-3">Who can follow</label>
                <select
                  value={settings.canFollow}
                  onChange={(e) => handleSettingChange('canFollow', e.target.value)}
                  className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option>Everyone</option>
                  <option>Nobody</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="text-gray-300 font-medium block mb-3">Who can view Playlists</label>
                <select
                  value={settings.viewPlaylists}
                  onChange={(e) => handleSettingChange('viewPlaylists', e.target.value)}
                  className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option>Everyone</option>
                  <option>Followers</option>
                  <option>Nobody</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 font-medium block mb-3">Who can view Album</label>
                <select
                  value={settings.viewAlbum}
                  onChange={(e) => handleSettingChange('viewAlbum', e.target.value)}
                  className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option>Everyone</option>
                  <option>Followers</option>
                  <option>Nobody</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 font-medium block mb-3">Notification reminder</label>
                <select
                  value={settings.notificationReminder}
                  onChange={(e) => handleSettingChange('notificationReminder', e.target.value)}
                  className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option>Everyone</option>
                  <option>Followers</option>
                  <option>Nobody</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end pt-6">
            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicProfileSettings;