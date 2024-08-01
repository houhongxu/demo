/******/ var __webpack_modules__ = ([ // ! 所有模块数组
/* 0 */, // ! 0是main模块，在最下方由iife直接执行了
/* 1 */
/*!********************!*\
  !*** ./cjs/sum.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = (...args) => args.reduce((x, y) => x + y, 0);


/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {}; // ! 模块缓存，相当于require.cache缓存
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) { // ! 模拟的require
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
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__); // ! 执行模块并获取到模块的module.exports
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports; // ! 返回模块module.exports相当于require了该模块
/******/ }
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./cjs/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const sum = __webpack_require__(/*! ./sum */ 1); // ! iife执行主入口，同时可以独立出作用域

console.log(sum(3, 8));

})();

