import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [moleIndex, setMoleIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hammerIndex, setHammerIndex] = useState(null); // ハンマーが表示される位置
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
      setHammerIndex(index); // ハンマーの位置を設定
      setMoleIndex(null);

      // ハンマーを0.5秒後に非表示にする
      setTimeout(() => {
        setHammerIndex(null);
      }, 500);
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
              border: '1px solid black',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* モグラまたは穴の画像 */}
            <img
              src={index === moleIndex ? "/assets/mole.png" : "/assets/hole.png"}
              alt={index === moleIndex ? "モグラ" : "穴"}
              style={{ width: '100%', height: '100%' }}
            />

            {/* クリック時に表示されるハンマー */}
            {index === hammerIndex && (
              <img
                src="/assets/hammer.png"
                alt="ハンマー"
                className="hammer"
              />
            )}
          </div>
        ))}
      </div>
      {timeLeft === 0 && <h2>ゲーム終了！最終スコア: {score}</h2>}
    </div>
  );
};

export default App;
