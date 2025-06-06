import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

const Main = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = async (search) => {
    if (!search.trim()) {
      setProducts([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3333/products?search=${search}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchProducts, 500), []);

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  return (
    <div className='container m-4'>
      <h1 className='text-danger mb-4'>Bool Autocomplete</h1>
      <input
        style={{ width: '350px' }}
        type="text"
        placeholder='inserisci...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {products.length > 0 && (
        <div className="dropdown-menu show bg-light rounded-bottom-4" style={{ width: '350px' }}>
          {products.map((p) => (
            <p
              key={p.id}
              className="dropdown-item m-0"
              onClick={() => {
                setSearch(p.name);
                setProducts([]);
              }}
              style={{ cursor: 'pointer' }}
            >
              {p.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
