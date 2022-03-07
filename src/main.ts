let table = document.querySelector('table');
let items = [
  {
    x: 1,
    y: 4,
    imgPath: 'icon.png',
    itemId: 1,
  },
  {
    x: 3,
    y: 1,
    imgPath: 'icon.png',
    itemId: 2,
  },
  {
    x: 2,
    y: 2,
    imgPath: 'icon.png',
    itemId: 3,
  },
];

// callbackfunction
const imgClick = (target) => {
  console.log(target);
}

let productData = new ItemsChart(table, {max_y: 6, max_x: 6, items: items, imgClick: imgClick});
table.addEventListener('click', (e) => {
  let target = e.target;
  if(target.tagName == 'IMG') {
    console.log(target);
  }
});

let $btns = document.querySelector('.btns');
let df = document.createDocumentFragment();


const timeCount = (fun) => {
  const start = performance.now();
  fun();
  const end = performance.now();
  console.log(end - start);
}