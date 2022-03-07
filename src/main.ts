import ItemsChart from '../lib/ItemChart';
import './style.css'

let table: HTMLTableElement = document.querySelector('table')!;
let items = [
  {
    x: 1,
    y: 4,
    imgPath: '/src/icon.png',
    itemId: 1,
  },
  {
    x: 3,
    y: 1,
    imgPath: '/src/icon.png',
    itemId: 2,
  },
  {
    x: 2,
    y: 2,
    imgPath: '/src/icon.png',
    itemId: 3,
  },
];

// callbackfunction
const imgClick = (target: HTMLImageElement) => {
  console.log(target);
}

let productData = new ItemsChart(table, {items: items, imgClick: imgClick});

let $deleteBtn = document.querySelector('#delete')!;
let $updateBtn = document.querySelector('#update')!;
let $addBtn = document.querySelector('#add')!;


//  random
function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 削除
$deleteBtn.addEventListener('click', () => {
  productData.delete();
});
// 更新
$updateBtn.addEventListener('click', () => {
  productData.update();
});
// 追加
$addBtn.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) {
    let x = getRandomIntInclusive(productData.x.min, productData.x.max);
    let y = getRandomIntInclusive(productData.y.min, productData.y.max);
    productData.dispositionItem({x: x, y: y, imgPath: '/src/icon.png', itemId: 111});
  }
});