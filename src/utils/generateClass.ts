export const generateClass = (classes: string[] | string) => {
  return Array.isArray(classes) ? classes.join(' ') : classes
}
