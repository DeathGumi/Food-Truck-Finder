import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for food trucks..."
        className="px-4 py-2 border rounded-l-md w-64"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-md whitespace-nowrap">
        Search
      </button>
    </form>
  );
}