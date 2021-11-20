/*
 * @Author: Whzcorcd
 * @Date: 2021-11-20 21:51:26
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 21:51:33
 * @Description: file content
 */
declare const _default: {
    WrapPlugin: {
        wrapPrivate: {
            include: (value?: string[], fn?: <T>(v: T) => void) => void
            exclude: (value?: string[], fn?: <T_1>(v: T_1) => void) => void
        }
        getPrivateProperty: () => any
    }
    VuePrivatePlugin: {
        install: (Vue: any) => void
    }
}
export default _default
