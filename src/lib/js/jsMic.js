// получить текстовую строку со всеми класами,
export function getFullClassName (className, classNameDefault) {
  // classNameDefault[текстовая строка] класс со старыми стилями
  // className[текстовая строка] класс с новыми стилями
  if (!className) return classNameDefault // если не задан className, возвращаем classNameDefault
  if (!classNameDefault) return className // если не задан classNameDefault, возвращаем className
  return (className + " " + classNameDefault) // если заданы оба класса, возвращаем текстовую строку классов
}

export const sleep = ms => {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

const _HIDE_SECTIONS_BY_DEVELOP_ON = true // включено скрытие при разработке
export const HIDE_SECTIONS_BY_DEVELOP = (_HIDE_SECTIONS_BY_DEVELOP_ON && (process.env.NODE_ENV === "development"))
