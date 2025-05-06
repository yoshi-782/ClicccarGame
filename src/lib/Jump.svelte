<script lang="ts">
  import animalImage from '../assets/animal_angora_usagi.png';
  let zIndex: number = -1;

  export const callback: () => void = () => {
      // 新しい画像要素を作成
      const newImg = document.createElement('img');
      newImg.src = animalImage;
      newImg.alt = 'Falling image';
      newImg.classList.add('falling-image', 'fall');
      newImg.style.userSelect = "none";
      newImg.setAttribute('tabindex', '-1');

      // X軸の開始位置と終了位置をランダムに設定
      const startX = 50; // 中央 (50%)
      const direction = Math.random() < 0.5 ? -1 : 1; // 左または右方向
      const endX = direction * (50 + Math.random() * 50); // 50% ~ 100%の範囲で遠ざかる

      // カスタムプロパティを設定
      newImg.style.setProperty('--start-x', `${startX}%`);
      newImg.style.setProperty('--end-x', `${endX}%`);

      newImg.style.zIndex = `${zIndex}`; // z-indexを設定
      zIndex -= 1; // 次の画像のためにz-indexを減少
      if (zIndex < -100) zIndex = -1; // z-indexの範囲を制限

      // `document.body` に画像を追加
      document.body.appendChild(newImg);

      // アニメーション終了後に要素を削除
      newImg.addEventListener('animationend', () => {
          newImg.remove();
      });
  };
</script>

<style>
  :global(.falling-image) {
    position: fixed;
    width: 400px;
    height: auto;
    user-select: none;
    -webkit-user-drag: none;
    left: 30%; /* 中央に配置 */
    top: 30%; /* 中央に配置 */
    transform: translate(-50%, -50%); /* 中央揃え */
    z-index: -1; /* 背景に配置 */
    outline: none;
  }

  /* アニメーション */
  :global(.fall) {
    animation: fallDown 0.8s forwards ease-in;
  }

  @keyframes fallDown {
    0% {
      transform: translateX(var(--start-x)) translateY(0) scale(0.2); /* 初期位置 */
      opacity: 1;
    }
    30% {
      transform: translateX(calc(var(--start-x) + var(--end-x) / 2)) translateY(-300px) scale(0.3); /* 跳ねる */
    }
    100% {
      transform: translateX(var(--end-x)) translateY(100%) scale(0.2); /* 終了位置 */
      opacity: 0;
    }
  }
</style>
