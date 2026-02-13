'use client';

import { useState } from 'react';
import ExploreMenu from '../../src/components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../src/components/FoodDisplay/FoodDisplay';

export default function ProductsPage() {
  const [category, setCategory] = useState('All');

  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '30px', textAlign: 'center' }}>
        Our Products
      </h1>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
}





