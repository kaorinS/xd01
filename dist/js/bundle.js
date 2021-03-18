/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener("DOMContentLoaded", function () {
  // 変数
  var hamBtn = document.getElementsByClassName("js-toggle-menu")[0],
      gNav = document.getElementsByClassName("js-toggle-target")[0],
      main = document.getElementsByClassName("js-main")[0],
      body = document.body,
      smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');

  // ドロワーメニューオープン
  var openNav = function openNav() {
    var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
    hamBtn.setAttribute("aria-expanded", "true");
    body.classList.add("fixedModalBody");
    main.classList.add("fixedModalMain");
    gNav.classList.add("is-drawerActive");
    main.style.top = "-" + scrollY + "px";
  };

  // ドロワーメニュークローズ
  var closeNav = function closeNav() {
    hamBtn.setAttribute("aria-expanded", "false");
    body.classList.remove("fixedModalBody");
    main.classList.remove("fixedModalMain");
    gNav.classList.remove("is-drawerActive");
    var scrollY = main.style.top;
    main.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  // ハンバーガーメニュー開閉
  hamBtn.addEventListener("click", function () {
    var getAriaExpanded = this.getAttribute("aria-expanded");
    if (getAriaExpanded == "false") {
      openNav();
    } else {
      closeNav();
    }
  });

  // リンク内スムーススクロール

  var _loop = function _loop(i) {
    smoothScrollTrigger[i].addEventListener("click", function (e) {
      // 速度
      var scrollSpeed = 400,
          timerStep = 20;
      // デフォルトの動きをキャンセル
      e.preventDefault();
      // ハンバーガーメニューを開いていたら閉じる
      if (hamBtn.getAttribute("aria-expanded") == "true") {
        closeNav();
      }
      // 遷移先の要素を取得
      var href = smoothScrollTrigger[i].getAttribute("href");
      var targetElement = document.getElementById(href.replace("#", ""));
      // 現在地
      var now = window.pageYOffset;
      // 遷移先までの距離
      var sectionPosition = targetElement.getBoundingClientRect().top;
      // ヘッダー高さ
      var headerHeight = 75;
      // 合計
      var target = sectionPosition - headerHeight;
      // ページ上部から遷移先までの高さ
      var goalPosition = now + target;
      // スクロール量
      var scrollStep = sectionPosition / (scrollSpeed / timerStep);

      // スクロール実行
      if ('scrollBehavior' in document.documentElement.style) {
        setTimeout(function () {
          window.scrollBy({
            top: target,
            behavior: "smooth"
          });
        }, 100);
      } else {
        var smoothScrollTimer = setInterval(function () {
          var currentScroll = window.pageYOffset;
          var plusScroll = currentScroll + scrollStep;
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
  };

  for (var i = 0; i < smoothScrollTrigger.length; i++) {
    _loop(i);
  }
}, false);

/***/ })
/******/ ]);