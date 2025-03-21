'use client';

import { use, useState, useEffect } from 'react';

export default function AttendancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split('T')[0]); // 現在の日付を初期値に設定
  const [recordTime, setRecordTime] = useState(new Date().toLocaleTimeString('it-IT').slice(0, 5)); // 現在の時刻を初期値に設定
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 従業員情報を取得するためのAPI呼び出し
    fetch(`/api/employee/${id}`)
      .then(response => response.json())
      .then(data => setName(data.name))
      .catch(err => console.error('Error fetching employee data:', err));
  }, [id]);

  const handleClockIn = async () => {
    if (!selectedType) {
      setMessage('エラー: 打刻タイプを選択してください');
      return;
    }

    try {
      const response = await fetch(`/api/employee/${id}/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordType: selectedType, recordDate, recordTime }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`${selectedType}の打刻が成功しました`);
        setSelectedType(null); // 打刻後に選択をリセット
      } else {
        setMessage(`エラー: ${data.message}`);
      }
    } catch (err) {
      setMessage('打刻処理中にエラーが発生しました');
    }
  };

  return (
    <div>
      <h2>勤怠管理ページ</h2>
      <p>従業員氏名: {name}</p>
      <div>
        <label htmlFor="recordDate">打刻日:</label>
        <input
          type="date"
          id="recordDate"
          value={recordDate}
          onChange={(e) => setRecordDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="recordTime">打刻時刻:</label>
        <input
          type="time"
          id="recordTime"
          value={recordTime}
          onChange={(e) => setRecordTime(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>打刻タイプを選択してください:</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            onClick={() => setSelectedType('出勤')}
            style={{ 
              padding: '10px', 
              backgroundColor: selectedType === '出勤' ? '#4CAF50' : '#e0e0e0', 
              color: selectedType === '出勤' ? 'white' : 'black', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            出勤
          </button>
          <button 
            onClick={() => setSelectedType('退勤')}
            style={{ 
              padding: '10px', 
              backgroundColor: selectedType === '退勤' ? '#f44336' : '#e0e0e0', 
              color: selectedType === '退勤' ? 'white' : 'black', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            退勤
          </button>
          <button 
            onClick={() => setSelectedType('休憩開始')}
            style={{ 
              padding: '10px', 
              backgroundColor: selectedType === '休憩開始' ? '#2196F3' : '#e0e0e0', 
              color: selectedType === '休憩開始' ? 'white' : 'black', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            休憩開始
          </button>
          <button 
            onClick={() => setSelectedType('休憩終了')}
            style={{ 
              padding: '10px', 
              backgroundColor: selectedType === '休憩終了' ? '#FF9800' : '#e0e0e0', 
              color: selectedType === '休憩終了' ? 'white' : 'black', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            休憩終了
          </button>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleClockIn}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
          disabled={!selectedType}
        >
          打刻
        </button>
      </div>
      {message && <p style={{ marginTop: '20px', color: message.includes('エラー') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
}
