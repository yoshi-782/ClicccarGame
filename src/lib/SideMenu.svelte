<script lang="ts">
  import { 
    rabbitCount, 
    click_countUpNum, 
    click_countUpNum_CN, 
    autoClickNum, 
    autoClickNum_CN, 
    autoClickNumAdd, 
    autoClickNumAdd_CN
  } from './stores';

  type MenuItem = {
    name: string;
    description: () => string; // 修正: HTMLを直接記述するためstring型に変更
    isEnabled: () => boolean;
    onClick: () => void;
  };

  const items: MenuItem[] = [
    {
      name: "クリック数増加",
      description: () => `
        クリック時にアンゴラウサギの増える数が1匹増えます。
        (現在: ${$click_countUpNum}匹)
        ${$click_countUpNum_CN} アンゴラウサギ必要です。
      `,
      isEnabled: () => $rabbitCount >= $click_countUpNum_CN,
      onClick: () => {
        rabbitCount.update((count: number) => count - $click_countUpNum_CN);
        click_countUpNum.update((num: number) => num + 1);
      },
    },
    {
      name: "自動クリック",
      description: () =>  `
        1秒毎に自動的にクリックします。
        (現在: ${$autoClickNum}匹)
        ${$autoClickNum_CN} アンゴラウサギ必要です。
      `,
      isEnabled: () => $rabbitCount >= $autoClickNum_CN,
      onClick: () => {
        rabbitCount.update((count: number) => count - $autoClickNum_CN);
        autoClickNum.update((num: number) => num + 1);


      },
    },
    {
      name: "自動クリック時のクリック数増加",
      description: () => `
        自動クリック時にアンゴラウサギの増える数が1匹増えます。
        (現在: ${$autoClickNumAdd}匹) <span style="color: tomato;">※「自動クリック」を有効にする必要があります。</span>
        ${$autoClickNumAdd_CN} アンゴラウサギ必要です。
      `,
      isEnabled: () => $rabbitCount >= $autoClickNumAdd_CN && $autoClickNum > 0,
      onClick: () => {
        rabbitCount.update((count: number) => count - $autoClickNumAdd_CN);
        autoClickNumAdd.update((num: number) => num + 1);
      },
    },
  ];

  let isOpen: boolean = false; // メニューの開閉状態を管理する変数
  const toggleMenu = () => isOpen = !isOpen; // メニューの開閉を切り替える関数
</script>

<!-- メニューボタン -->
<button class="toggle-button" onclick={toggleMenu}>
  {isOpen ? '閉じる' : 'アイテム'}
</button>
  
<!-- サイドメニュー -->
<div class="menu {isOpen ? 'open' : ''}">
  <h2>アイテムメニュー</h2>
  {#each items as item}
    <button
      class="menu-item"
      onclick={item.onClick}
      disabled={!item.isEnabled()}
    >
      <strong>{item.name}</strong><br />
      <span class="item-description">
        {@html item.description()}
      </span>
    </button>
  {/each}
</div>

<style>
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 100vh;
    background-color: #333;
    color: white;
    padding: 1rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
  }

  .menu-item {
    text-align: left;
    margin: 1rem 0;
    padding: 0.5rem;
    background-color: #ddd;
    border: 1px solid #ccc;
    border-radius: 6px;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    color: black;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .menu-item:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .menu-item:active {
    transform: scale(0.95);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }

  .menu-item:disabled {
    background-color: #444;
    color: #888;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  .menu-item > strong {
    font-size: 1.2rem;
  }

  .item-description {
    text-align: left;
    white-space: pre-line;
  }

  .menu.open {
    transform: translateX(0);
  }

  .toggle-button {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1100;
  }
</style>
