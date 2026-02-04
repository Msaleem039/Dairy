'use client';

import { Suspense } from 'react';
import Verify from '../../src/pages/Verify/Verify';
import '../../src/pages/Verify/Verify.css';

function VerifyContent() {
  return <Verify />;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className='verify'><div className="spinner"></div></div>}>
      <VerifyContent />
    </Suspense>
  );
}

