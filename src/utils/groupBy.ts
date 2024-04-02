export default function groupBy(array: any[], callback: Function): any[] {
  return array.reduce((result, item) => {
    const key = callback(item)

    if (!result[key]) {
      result[key] = []
    }

    result[key].push(item)

    return result
  }, {})
}
