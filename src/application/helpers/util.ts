export const get = (obj: object, path: string, defaultValue: any = undefined): any => {
  const travel = (regexp: RegExp): any =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res: any, key): any => (res !== null && res !== undefined ? res[key] : res), obj)
  const result = (Boolean(travel(/[,[\]]+?/))) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}
