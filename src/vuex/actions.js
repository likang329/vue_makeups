/**
 * 操作，可以分解成多个文件
 * 用统一的函数处理并分发mutations。
 * @param type
 * @returns {function({dispatch: *}, ...[*]): }
 */

function makeAction (type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args)
}

import { SET_HEADER_TITLE } from './mutation-types'

/**
 * actions
 */
export const setTitle = makeAction(SET_HEADER_TITLE)