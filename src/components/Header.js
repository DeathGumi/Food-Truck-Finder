import SearchBar from './SearchBar';

export default function Header({ onSearch }) {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex flex-row justify-between items-center w-full !important">
        <h1 className="text-2xl font-bold text-black inline-block">Food Truck Finder</h1>
        <div className="inline-block">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
}