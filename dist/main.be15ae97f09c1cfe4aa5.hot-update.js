/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateglo_webpack"]("main",{

/***/ "./src/modules/modals.js":
/*!*******************************!*\
  !*** ./src/modules/modals.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar modals = function modals() {\n  console.log('modals');\n  var popup = document.querySelector('.header-modal');\n  var overlay = document.querySelector('.overlay');\n  var count = 0;\n  var movePopUp;\n  var width = document.documentElement.clientWidth;\n\n  var move = function move() {\n    movePopUp = requestAnimationFrame(move);\n    count += 10;\n    count++;\n\n    if (count < 200) {\n      popup.firstElementChild.style.top = count + 'px';\n    } else {\n      cancelAnimationFrame(movePopUp);\n    }\n  };\n\n  var resetAnim = function resetAnim() {\n    count = 0;\n    popup.firstElementChild.style.top = -350 + 'px';\n    popup.style.display = 'none';\n    overlay.style.display = 'none';\n  };\n\n  document.body.addEventListener('click', function (event) {\n    var target = event.target;\n    console.log(\"🚀 ~ file: modals.js ~ line 28 ~ modals ~ target\", target);\n    width = document.documentElement.clientWidth;\n\n    if (target.classList.contains('fancyboxModal')) {\n      console.log('asd');\n      popup.style.display = 'block';\n      overlay.style.display = 'flex';\n\n      if (width > 768) {\n        movePopUp = requestAnimationFrame(move);\n      } else if (width < 768) {\n        cancelAnimationFrame(movePopUp);\n        popup.firstElementChild.style.top = 200 + 'px';\n      }\n    } else if (target.classList.contains('.header-modal__close')) {\n      resetAnim();\n    } else {\n      target = target.closest('.popup-content');\n\n      if (!target) {\n        resetAnim();\n      }\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);\n\n//# sourceURL=webpack://glo_webpack/./src/modules/modals.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7255e307957fde4d2b43")
/******/ })();
/******/ 
/******/ }
);