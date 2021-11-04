export interface Meta {
  isOutline: boolean
  isExported: boolean
  sizes: number[]
}

/**
 * @example
 * parseMeta('Filled=True, Outline=False, 24=True, 16=False'): {
 *   size: 24,
 *   isOutline: false,
 * }
 */
export function parseMeta(meta: string): Meta {
  const result: Meta = { isOutline: false, isExported: true, sizes: [0] }
  const chunks = meta.replace(/\s/g, '').split(',')

  for (const chunk of chunks) {
    const [token, value] = chunk.split('=')

    switch (token) {
      case 'Outline':
        result.isOutline = value === 'True'
        break
      case 'Filled':
        result.isOutline = value !== 'True'
        break
      case 'Export':
        result.isExported = value === 'False' ? false : true
        break
      default:
        result.sizes = value === 'True' ? [Number(token)] : result.sizes
        break
    }
  }

  return result
}
