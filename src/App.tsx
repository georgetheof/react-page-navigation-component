import './App.css';
import PageNavigation from './components/page-navigation/PageNavigation';

function App() {
  return (
    <div className='h-screen flex flex-col'>
      <section className='py-6 px-12 text-left'>
        <h3>Features:</h3>
        <ul className='ps-5 mt-2 space-y-1 list-disc list-inside'>
          <li>Reordering with Drag and Drop</li>
          <li>Adding a new page between any two existing pages via a "+" button that appears on hover</li>
          <li>Context menu per page ("Set as first page" and "Delete" are functional)</li>
          <li>Active page is highlighted</li>
        </ul>
      </section>

      <PageNavigation />
    </div>
  );
}

export default App;
