import(
  /* webpackPreload: true */
  './add'
).then((m) => {
  m.default(5, 6)
})

const sum = (...args) => args.reduce((x, y) => x + y)

export default sum
