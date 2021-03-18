window.addEventListener("DOMContentLoaded", () => {
  // 変数
  const hamBtn = document.getElementsByClassName("js-toggle-menu")[0],
        gNav = document.getElementsByClassName("js-toggle-target")[0],
        main = document.getElementsByClassName("js-main")[0],
        body = document.body,
        smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');

  // ドロワーメニューオープン
  const openNav = function () {
    const scrollY =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : document.documentElement.scrollTop;
    hamBtn.setAttribute("aria-expanded", "true");
    body.classList.add("fixedModalBody");
    main.classList.add("fixedModalMain");
    gNav.classList.add("is-drawerActive");
    main.style.top = `-${scrollY}px`;
  };

  // ドロワーメニュークローズ
  const closeNav = function () {
    hamBtn.setAttribute("aria-expanded", "false");
    body.classList.remove("fixedModalBody");
    main.classList.remove("fixedModalMain");
    gNav.classList.remove("is-drawerActive");
    const scrollY = main.style.top;
    main.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  // ハンバーガーメニュー開閉
  hamBtn.addEventListener("click", function () {
    const getAriaExpanded = this.getAttribute("aria-expanded");
    if (getAriaExpanded == "false") {
      openNav();
    } else {
      closeNav();
    }
  });

  // リンク内スムーススクロール
  for (let i = 0; i < smoothScrollTrigger.length; i++) {
    smoothScrollTrigger[i].addEventListener("click", function (e) {
      // 速度
      const scrollSpeed = 400,
            timerStep = 20;
      // デフォルトの動きをキャンセル
      e.preventDefault();
      // ハンバーガーメニューを開いていたら閉じる
      if (hamBtn.getAttribute("aria-expanded") == "true") {
        closeNav();
      }
      // 遷移先の要素を取得
      const href = smoothScrollTrigger[i].getAttribute("href");
      const targetElement = document.getElementById(href.replace("#", ""));
      // 現在地
      const now = window.pageYOffset;
      // 遷移先までの距離
      const sectionPosition = targetElement.getBoundingClientRect().top;
      // ヘッダー高さ
      const headerHeight = 75;
      // 合計
      const target = sectionPosition - headerHeight;
      // ページ上部から遷移先までの高さ
      const goalPosition = now + target;
      // スクロール量
      const scrollStep = sectionPosition / (scrollSpeed / timerStep);

      // スクロール実行
      if('scrollBehavior' in document.documentElement.style){
        setTimeout(() => {
          window.scrollBy({
            top: target,
            behavior: "smooth",
          });
        }, 100);
      }else{
        const smoothScrollTimer = setInterval(() => {
          let currentScroll = window.pageYOffset;
          let plusScroll = currentScroll + scrollStep;
          // 正か負か
          if (scrollStep > 0) {
            if (plusScroll >= goalPosition) {
              // 完了時
              window.scrollTo(0, goalPosition);
              clearInterval(smoothScrollTimer);
            } else {
              window.scrollBy(0, scrollStep);
            }
          } else {
            if (plusScroll <= goalPosition) {
              window.scrollTo(0, goalPosition);
              clearInterval(smoothScrollTimer);
            } else {
              window.scrollBy(0, scrollStep);
            }
          }
        }, timerStep);
      }
    });
  }
}, false);