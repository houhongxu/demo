/******/ "use strict";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/*!********************!*\
  !*** ./esm/sum.js ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export name [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__); // ! 标记是该模块是es模块
/* harmony export */ __webpack_require__.d(__webpack_exports__, { // ! 将default，name使用getter定义在__webpack_exports__ getter具有懒加载特效，只有访问时才会计算属性的值，所以__WEBPACK_DEFAULT_EXPORT__和name可以在下方定义
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__), // ! getter 见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get
/* harmony export */   "name": () => (/* binding */ name)
/* harmony export */ });
const sum = (...args) => args.reduce((x, y) => x + y, 0);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sum);

const name = "sum";


/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) { // ! 将模块定义的导出属性都使用getter定义在exports上，如default,name
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */ // ! 就是Object.prototype.hasOwnProperty
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */ // ! 标记
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });// ! Symbol.toStringTag由 Object.prototype.toString() 方法内部调用
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });// ! 定义属性exports.__esModule为true
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./esm/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sum */ 1);



console.log((0,_sum__WEBPACK_IMPORTED_MODULE_0__["default"])(3, 4));
console.log(_sum__WEBPACK_IMPORTED_MODULE_0__.name);
console.log(_sum__WEBPACK_IMPORTED_MODULE_0__);

})();
