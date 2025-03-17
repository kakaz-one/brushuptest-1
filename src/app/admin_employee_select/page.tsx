import Link from 'next/link'

export default function AdminEmployeeSelect() {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>従業員選択ページ</h1>
      <Link href="/">
        <button style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          戻る
        </button>
      </Link>
    </div>
  )
} 