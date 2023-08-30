import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ className, onSearch, onSelect, items, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const [input] = e.target;

    onSearch(input.value);
  };

  const handleBlur = (e) => {
    if (!e.relatedTarget) {
      setOpen(false);
    }
  };

  const handleSelect = (item) => {
    setOpen(false);

    onSelect(item);
  };

  return (
    <div className={`relative text-sm bg-white rounded-md ${className}`} {...props}>
      <form onFocus={() => setOpen(true)} onBlur={handleBlur} onSubmit={handleSubmit} className="flex items-center">
        <input className="rounded-md p-2 text-sm w-full" type="search" />
        <button
          type="submit"
          className="text-sm px-3 bg-purple-300 h-9 rounded-r-md text-purple-900 hover:bg-purple-400 transition"
        >
          <FaSearch />
        </button>
      </form>

      {items.length && open ? (
        <ul className="absolute flex flex-col bg-white w-full rounded-md mt-1 p-2 max-h-80 overflow-y-scroll z-10">
          {items.map(({ image, name, artist, preview_url }) => (
            <li key={`${preview_url}-${image}`}>
              <button
                onClick={() => handleSelect({ image, name, artist, preview_url })}
                className="flex items-center gap-2 border-b py-2 text-sm w-full hover:bg-gray-100 transition"
              >
                <img src={image} alt={`${artist}-${name}`} className="w-16 h-16 bg-green-300" />
                <div className="flex flex-col items-start text-start">
                  <h1>{name}</h1>
                  <p>{artist}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
