type Coord = {
  max: number;
  min: number;
}

type Item = {
  x: number;
  y: number;
  imgPath: string;
  itemId: number;
}

type ItemsChartArgument = {
  x?: Partial<Coord>;
  y?: Partial<Coord>;
  items: Array<Item>;
  imgClick: Function;
}

const coordInit: Coord = {
  min: 0,
  max: 6
}

export default class ItemsChart {
  public table: HTMLTableElement;
  public x: Coord;
  public y: Coord;
  public items: Array<Item>;
  constructor(table: HTMLTableElement, {x, y, items, imgClick}: ItemsChartArgument) {
    this.table = table;
    this.table.style.borderCollapse = 'colloapse';
    this.x = {...coordInit, ...x};
    this.y = {...coordInit, ...y};
    this.items = items;
    this.#createItemsChart();
    this.table.addEventListener('click', (e: Event) => {
      let target = e.target as HTMLElement;
      if(target.tagName == 'IMG') {
        imgClick(target);
      }
    });
  }

  // publicメソッド
  // item(img)を配置
  dispositionItem(item: Item) {
    if(item.x > this.x.max || item.y > this.y.max) {
      console.log('xかyが最大値を超えています');
      return;
    }
    this.#dispositionImg(item);
  }

  // 削除
  delete() {
    let current_tbody = this.table.querySelector<HTMLElement>('tbody');
    // 無かったら
    if(!current_tbody) {
      console.log('tbodyがありません');
      return;
    };
    current_tbody.remove();
  }

  // 更新（再構築）
  update() {
    this.delete();
    this.#createItemsChart();
  }

  // privateメソッド
  // 構築
  #createItemsChart() {
    let tbody = this.#createTableBody();
    this.table.appendChild(tbody);
    this.items.forEach(item => {
      this.dispositionItem(item);
    });
  }

  // テーブルの中身を作成
  #createTableBody() {
    const tbody = document.createElement('tbody');
    const df_tbody = document.createDocumentFragment();
    // 縦(y)のループ
    for (let y_index = 0; y_index < this.y.max; y_index++) {
      const tr = document.createElement('tr');
      const df_tr = document.createDocumentFragment();

      // 縦の上が0からになるから 下が0になるように
      const y = this.y.max - y_index - 1;

      // 横(x)のループ
      for (let x_index = 0; x_index < this.x.max; x_index++) {
        // td作成
        const td = this.#createTd({
          x: x_index,
          y: y,
          option: {x: this.x, y: this.y},
        });

        // trもどきに追加
        df_tr.appendChild(td);
      }
      // trもどきを使う事でまとめてtdをtrに追加出来る
      tr.appendChild(df_tr);
      df_tbody.appendChild(tr);
    }
    tbody.appendChild(df_tbody);
    return tbody;
  }

  // td作成
  #createTd({x, y, option}: {x: number, y: number, option: {x: Coord, y: Coord}}) {
    let td = document.createElement('td');

    // itemを追加しやすいよう(特定のtdを検索しやすい)にdata属性を追加
    td.dataset.y = String(y);
    td.dataset.x = String(x);

    // class追加
    td.classList.add('td');

    // 一番左の行の場合
    if(x == 0) {
      // class追加
      td.classList.add('left');

      // 目盛りの数字追加
      this.#generateScale({
        element: td,
        text: String(y),
        classNames: ['vertical_scale']
      });

      // 左上の場合
      if(0 == (option.y.max - y - 1)) {
        this.#generateScale({
          element: td,
          text: String(option.y.max),
          classNames: ['vertical_scale', 'top']
        });
      }
    }

    // 一番下の列の場合
    if(y == 0) {
      // class追加
      td.classList.add('bottom');

      // 目盛りの数字追加
      this.#generateScale({
        element: td,
        text: String(x),
        classNames: ['beside_scale'],
      });

      // 右下の場合
      if(0 == (option.x.max - x - 1)) {
        this.#generateScale({
          element: td,
          text: String(option.x.max),
          classNames: ['beside_scale', 'right'],
        });
      }
    }

    return td;
  }

  // 目盛り用の要素(div)を作成
  #generateScale({element, text, classNames}: {element: HTMLElement, text: string, classNames: Array<string>}): void {
    let div = document.createElement('div');
    div.textContent = text;
    classNames.forEach(className => {
      div.classList.add(className);
    });
    // 要素を追加
    element.appendChild(div);
  }

  // 画像を生成し配置する
  #dispositionImg({x, y, imgPath, itemId}: Item) {
    let img = new Image();
    img.src = imgPath;
    img.classList.add('img');
    img.dataset.itemId = String(itemId);

    // 端の場合
    if(x == this.x.max || y == this.y.max) {
      if(x == this.x.max) {
        x -= 1;
        img.classList.add('right');
      }
      if(y == this.y.max) {
        y -= 1;
        img.classList.add('top');
      }
      let target = document.querySelector<HTMLElement>(`[data-y="${y}"][data-x="${x}"]`)!;
      target.appendChild(img);
      return;
    }

    let target = document.querySelector<HTMLElement>(`[data-y="${y}"][data-x="${x}"]`)!;
    target.appendChild(img);
  }
}