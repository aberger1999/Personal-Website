export default function AppleQualityProject() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Apple Quality Project</h1>
      <p className="text-lg text-gray-300 mb-8">
        This project determines the quality of an apple using machine learning. Below is the notebook rendered as HTML.
      </p>
      <div className="w-full min-h-[80vh] border rounded-lg bg-white overflow-auto">
        <iframe
          src="/notebooks/Apple-Quality-Notebook.html"
          title="Apple Quality Notebook"
          className="w-full min-h-[80vh] border-none"
        />
      </div>
    </div>
  );
}
