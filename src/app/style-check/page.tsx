export default function StyleCheck() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Clean Dashboard Theme Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm text-slate-600 mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-slate-900">2,847</p>
            <p className="text-sm text-green-600">+12.5% from last month</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm text-slate-600 mb-2">Revenue</h3>
            <p className="text-2xl font-bold text-slate-900">$45,231</p>
            <p className="text-sm text-green-600">+20.1% from last month</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm text-slate-600 mb-2">Active Projects</h3>
            <p className="text-2xl font-bold text-slate-900">89</p>
            <p className="text-sm text-green-600">+8.2% from last month</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Performance Matrix</h2>
          <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">Chart placeholder</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Clean Theme Verification</h2>
          <p className="text-blue-700">
            If you can see this styled box with clean white cards, proper typography, and blue accents,
            then the clean dashboard theme is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
}