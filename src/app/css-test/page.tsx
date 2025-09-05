export default function CSSTest() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">CSS Visibility Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Test Card 1</h3>
            <p className="text-slate-600 mb-4">This is a test card to verify text visibility and card styling.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Test Button
            </button>
          </div>
          
          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Test Card 2</h3>
            <p className="text-slate-600 mb-4">Another test card with different content to check contrast.</p>
            <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg border-2 border-slate-300 hover:bg-slate-200">
              Secondary Button
            </button>
          </div>
          
          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Test Card 3</h3>
            <p className="text-slate-600 mb-4">Third test card to ensure all text is clearly visible.</p>
            <input 
              type="text" 
              placeholder="Test input field"
              className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg text-slate-900"
            />
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">CSS Status Check</h2>
          <p className="text-blue-700">
            If you can see this text clearly with proper contrast, then the CSS is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
}

