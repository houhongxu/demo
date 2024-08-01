"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([[0],[
/* 0 */,
/* 1 */,
/* 2 */
/*!**************************************!*\
  !*** ./06-bundle-spliting/common.js ***!
  \**************************************/
/*! namespace exports */
/*! export name [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "name": () => (/* binding */ name)
/* harmony export */ });
const name = 'common'

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** ./06-bundle-spliting/bar.js ***!
  \***********************************/
/*! namespace exports */
/*! export name [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "name": () => (/* binding */ name)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ 2);


const name = _common__WEBPACK_IMPORTED_MODULE_0__.name + 'bar'

/***/ })
]]);