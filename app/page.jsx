'use client';

import { useState } from 'react';
import Header from '../src/components/Header/Header';
import ExploreMenu from '../src/components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../src/components/FoodDisplay/FoodDisplay';
import AppDownload from '../src/components/AppDownload/AppDownload';

export default function Home() {
  const [category, setCategory] = useState('All');

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
}

