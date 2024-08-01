(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([[2],[
/* 0 */
/*!*************************************!*\
  !*** ./06-bundle-spliting/index.js ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__.e, __webpack_require__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.all(/*! import() | foo */[__webpack_require__.e(4), __webpack_require__.e(1)]).then(__webpack_require__.bind(__webpack_require__, /*! ./foo */ 1)).then(m => {
  console.log(m.name)
})

Promise.all(/*! import() | bar */[__webpack_require__.e(4), __webpack_require__.e(0)]).then(__webpack_require__.bind(__webpack_require__, /*! ./bar */ 3)).then(m => {
  console.log(m.name)
})


/***/ })
],
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(0));
/******/ }
]);