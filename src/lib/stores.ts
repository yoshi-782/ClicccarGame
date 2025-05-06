import { derived, writable } from "svelte/store";

/**
 * ウサギを数えるためのストア
 */
export const rabbitCount = writable<number>(0);
/**
 * ウサギの数をカウントアップするためのストア
 */
export const click_countUpNum = writable<number>(1);
/**
 * クリック時に増える数アイテムの消費数
 */
export const click_countUpNum_CN = derived(
  click_countUpNum,
  $click_countUpNum => $click_countUpNum * 20
)
/**
 * 1秒毎に自動的にクリックする数
 */
export const autoClickNum = writable<number>(0);
/**
 * 1秒毎に自動的にクリックする数アイテムの消費数
 */
export const autoClickNum_CN = derived(
  autoClickNum,
  $autoClickNum => ($autoClickNum + 1) * 60
)
/**
 * 自動クリック時に増える数
 */
export const autoClickNumAdd = writable<number>(1);
/**
 * 自動クリック時に増えるアイテムの消費数
 */
export const autoClickNumAdd_CN = derived(
  autoClickNumAdd,
  $autoClickNumAdd => $autoClickNumAdd * 500
)

let beforeAutoClickNum = 0;
const countTimer: number[] = [];
setInterval(() => {
    let currentAutoClickNumAdd = 0;
    let currentAutoClickNum = 0;

    // 最新の値を取得
    autoClickNumAdd.subscribe(value => {
        currentAutoClickNumAdd = value;
    })();
    autoClickNum.subscribe(value => {
        currentAutoClickNum = value;
    })();

    if (currentAutoClickNum === 0) {
        // 自動クリックが無効な場合は何もしない
        return;
    }

    if (beforeAutoClickNum !== currentAutoClickNum) {
        // ボタンがクリックされた
        countTimer.push(-1);
        beforeAutoClickNum = currentAutoClickNum;
    }

    for (let i = 0; i < countTimer.length; i++) {
        countTimer[i] += 1;
        if (countTimer[i] === 5) {
            // 1秒経過したらウサギの数カウントアップ
            rabbitCount.update((count) => count + currentAutoClickNumAdd);
            countTimer[i] = 0;
        }
    }
}, 200);
