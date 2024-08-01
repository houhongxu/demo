type pl = Partial<{}>
type re = Required<{}>
type ry = Readonly<{}>
type rd = Record<string, any>

type pk = Pick<{ name: '测试' }, 'name'>
type ot = Omit<{ name: '测试' }, 'name'>

type ee = Exclude<1 | 2, 1>
type et = Extract<1 | 2 | 3, 3 | 4>

type fe = Function
type ps = Parameters<(name: string) => void>
type rt = ReturnType<(name: string) => void>
