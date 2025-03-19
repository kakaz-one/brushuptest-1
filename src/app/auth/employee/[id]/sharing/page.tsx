'use client';

import { use } from 'react';

export default function SharingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div>
      <h2>情報共有ページ</h2>
      <p>従業員ID: {id}</p>
      {/* 情報共有の内容をここに表示 */}
    </div>
  );
}
