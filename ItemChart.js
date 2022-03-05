class ItemsChart {
  constructor(table, {max_y = 6, max_x = 6, items}) {
    this.table = table;
    this.table.style.borderCollapse = 'colloapse';
    this.max_y = max_y;
    this.max_x = max_x;
    this.items = items;
    this.#createItemsChart();
  }

  // publicメソッド
  // item(img)を配置
  dispositionItem(item) {
    if(item.x > this.max_x || item.y > this.max_y) {
      console.log('xかyが最大値を超えています');
      return;
    }
    this.#dispositionImg(item.x, item.y, item.imgPath, item.itemId);
  }

  // 削除
  delete() {
    let current_tbody = this.table.querySelector('tbody');
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
    for (let y_index = 0; y_index < this.max_y; y_index++) {
      const tr = document.createElement('tr');
      const df_tr = document.createDocumentFragment();

      // 縦の上が0からになるから 下が0になるように
      const y = this.max_y - y_index - 1;

      // 横(x)のループ
      for (let x_index = 0; x_index < this.max_x; x_index++) {
        // td作成
        const td = this.#createTd({
          x: x_index,
          y: y, 
          max_x: this.max_x,
          max_y: this.max_y,
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
  #createTd({x, y, max_x, max_y}) {
    let td = document.createElement('td');

    // itemを追加しやすいよう(特定のtdを検索しやすい)にdata属性を追加
    td.dataset.y = y;
    td.dataset.x = x;

    // class追加
    td.classList.add('td');

    // 一番左の行の場合
    if(x == 0) {
      // class追加
      td.classList.add('left');

      // 目盛りの数字追加
      this.#generateScale({
        element: td,
        text: y,
        classNames: ['vertical_scale']
      });

      // 左上の場合
      if(0 == (max_y - y - 1)) {
        this.#generateScale({
          element: td,
          text: max_y,
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
        text: x,
        classNames: ['beside_scale'],
      });

      // 右下の場合
      if(0 == (max_x - x - 1)) {
        this.#generateScale({
          element: td,
          text: max_x,
          classNames: ['beside_scale', 'right'],
        });
      }
    }

    return td;
  }

  // 目盛り用の要素(div)を作成
  #generateScale({element, text, classNames}) {
    let div = document.createElement('div');
    div.textContent = text;
    classNames.forEach(className => {
      div.classList.add(className);
    });
    // 要素を追加
    element.appendChild(div);
  }

  // 画像を生成し配置する
  #dispositionImg(x, y, imgPath, itemId) {
    let img = new Image();
    img.src = imgPath;
    img.classList.add('img');
    img.dataset.itemId = itemId;

    // 端の場合
    if(x == this.max_x || y == this.max_y) {
      if(x == this.max_x) {
        x -= 1;
        img.classList.add('right');
      }
      if(y == this.max_y) {
        y -= 1;
        img.classList.add('top');
      }
      let target = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
      target.appendChild(img);
      return;
    }

    let target = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
    target.appendChild(img);
  }
}