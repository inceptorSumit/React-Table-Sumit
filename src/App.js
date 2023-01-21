import logo from './logo.svg';
import './App.css';
import { BasicTable } from './components/BasicTable';
import { PaginationTable } from './components/PaginationTable';
import { SortingTable } from './components/SortingTable';
function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      <PaginationTable />
      {/* <SortingTable /> */}
    </div>
  );
}

export default App;
