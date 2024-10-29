import React, { useState, useEffect } from 'react';

const App = () => {
  const [moleIndex, setMoleIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const gridSize = 9; // 3x3のグリッド

  // モグラの位置をランダムに変更
  useEffect(() => {
    if (timeLeft > 0) {
      const moleTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * gridSize);
        setMoleIndex(randomIndex);
      }, 800); // 0.8秒ごとにモグラが移動

      return () => clearInterval(moleTimer);
    }
  }, [timeLeft]);

  // ゲームのタイマー
  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timeLeft]);

  // モグラをクリックした時の処理
  const hitMole = (index) => {
    if (index === moleIndex) {
      setScore(score + 1);
      setMoleIndex(null);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>モグラ叩きゲーム</h1>
      <p>スコア: {score}</p>
      <p>残り時間: {timeLeft}秒</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px' }}>
        {Array.from({ length: gridSize }).map((_, index) => (
          <div
            key={index}
            onClick={() => hitMole(index)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: index === moleIndex ? 'brown' : 'lightgreen',
              border: '1px solid black',
              cursor: 'pointer',
            }}
          >
            {index === moleIndex && 'モグラ'}
          </div>
        ))}
      </div>
      {timeLeft === 0 && <h2>ゲーム終了！最終スコア: {score}</h2>}
    </div>
  );
};

export default App;
