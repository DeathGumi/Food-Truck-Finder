import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for food trucks..."
        className="px-4 py-2 border rounded-l-md"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-md">
        Search
      </button>
    </form>
  );
}