<script lang="ts">
  import animalImage from '../assets/animal_angora_usagi.png';
  import Jump from './Jump.svelte';
  import { rabbitCount, click_countUpNum,  } from './stores';

  let jump_ele: InstanceType<typeof Jump> | null = null;

  const increment = () => {
    rabbitCount.update((count: number) => count + $click_countUpNum);
    for (let _ = 0; _ < $click_countUpNum; _++) {
      jump_ele?.callback();
    }
  };
</script>

<p class="counter">{$rabbitCount} アンゴラウサギ</p>
<Jump bind:this={jump_ele} />
<button type="button" class="btn" onclick="{increment}">
  <img src={animalImage} alt="Increment button">
</button>

<style>
  /* カウントのスタイル */
  .counter {
    position: fixed;
    top: 10%; /* 画面上部に配置 */
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  /* ボタンのスタイル */
  button {
    position: fixed;
    top: 50%; /* 画面中央より少し下に配置 */
    left: 50%;
    transform: translate(-50%, -50%);
    background: none; /* 背景を透明に */
    border: none; /* ボーダーを削除 */
    padding: 0; /* 余白を削除 */
    cursor: pointer; /* カーソルをポインターに */
    outline: none;
  }

  button:focus-visible {
    outline: 2px solid #007BFF; /* キーボード操作時のみフォーカスリングを表示 */
  }

  button > img {
    width: 400px;
    user-select: none;
    -webkit-user-drag: none;
    transition: transform 0.1s ease; /* スムーズな変化 */
  }

  button > img:hover {
    transform: scale(1.1); /* ホバー時に少し拡大 */
  }

  button > img:active {
    transform: scale(0.9); /* 押したときに少し縮む */
  }
</style>