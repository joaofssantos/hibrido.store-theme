declare module '*.module.css'
declare module '*.module.scss'

declare module 'vtex.render-runtime' {
  export const NoSSR: any
  const _default: any
  export default _default
}

declare module 'classnames' {
  function classNames(...args: any[]): string
  export = classNames
}
