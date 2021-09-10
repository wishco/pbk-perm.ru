//-----------------------------------------------------------------------------------------------------
// фунция преабразует текст в массив, возвращаем массив Array = [ [...], [...], ... , [...] ]
export function getArrayFromText(text) {
  const BETWEEN_CELL = 9 // символ "между ячейками"
  const END_ROW = 13 // символ "конец ряда"
  const NEW_ROW = 10 // символ "начало нового ряда"
  let tableArray = []
  let rowArray = []
  let cellValue = ""

  for (let i = 0; i < text.length; i++) { // последовательный перебор всех символов из строки
    let currentSymbol = text[i].charCodeAt(0) // текущий символ
    switch (currentSymbol) {
      case END_ROW:
        rowArray.push(cellValue) // добавить в массив-ряда, значение собранного значение ячейки
        cellValue = "" // сбросить значение ячейки, т.к. будем составлять значение для новой ячейки
        tableArray.push(rowArray) // добавить в массив-таблицы, значение собранного значения ряда
        rowArray = [] // сбросить значение ряда, т.к. будем составлять значение для нового ряда
        break;
      case NEW_ROW:
        break;
      case BETWEEN_CELL:
        rowArray.push(cellValue) // добавить в массив-ряда, значение собранного значение ячейки
        cellValue = "" // сбрасываем значение ячейки, т.к. будем составлять значение для новой ячейки
        break;
      default: // выполняем если символ не (КОНЕЦ СТРОКИ, НОВЫЙ РЯД, МЕЖДУ ЯЧЕЕК)
        cellValue = cellValue + text[i]
    }
  }
  return tableArray
};


//-----------------------------------------------------------------------------------------------------
// получить текст из буфера обмена
export async function getClipboardText() {
  let textOut = "";
  await navigator.clipboard.readText()
    .then(text => {
      textOut = text
    })
    .catch(err => {
      textOut = null
    })
  return textOut
}

//-----------------------------------------------------------------------------------------------------
// функция создает объект данных из массива, если возможно собрать объект из массива
export function getStructureFromArray(array, placesStructureStandard) {

  const COLUMN_START = 0 // номер колонки в массиве, НЕОБХОДИМЫЙ
  const ROW_HEAD = 7 // номер ряда в массиве, где начинеается заголовок
  const ROW_LIST = 10 // номер ряда в массиве, где начинаются данные о доме (квартирах...)
  const LENGTH_COLUMN = 12 //

  function isExistText({cellText, pattern}) {
    const expr = RegExp(pattern, 'i'); // pattern i - не учитывать регистр
    console.log("||||||||||||||||||||||||||||||||||||||||||")
    console.log(cellText)

    return cellText.match(expr)
  }

  // поверяем, что данные в массиве соответствуют данным  необходимой структуры в placesStructureStandard
  const structureNorm = {} // структура, с данными СООТВЕТСТВИЕ
  const structureBad = {} // структура, с данными НЕ СООТВЕТСТВИЕ
  const objVals = Object.values(placesStructureStandard)
  const objKeys = Object.keys(placesStructureStandard)

  if (array.length < LENGTH_COLUMN) return null

  for (let i = 0; i < (objVals.length); i++) {
    console.log(objVals.length)
    console.log(i)
    let objVerif = objVals[i]
    if ( // проверяем заголовок текста на соответствие структуре, заголовок из двух строк
      (isExistText({cellText: array[ROW_HEAD][objVerif.column], pattern: objVals[i].pattern})) // если строка текста(ячейка) содержит, необходимый текст
      || // или
      (isExistText({cellText: array[ROW_HEAD + 1][objVerif.column], pattern: objVals[i].pattern})) // если строка текста(ячейка) содержит, необходимый текст [расположена на ряд ниже]
    ) {
      structureNorm[objKeys[i]] = i
    } else {
      structureBad[objKeys[i]] = {}
      structureBad[objKeys[i]].columnNeed = i
      structureBad[objKeys[i]][objVerif.column] = i
      structureBad[objKeys[i]].cellText = array[ROW_HEAD][objVerif.column]
      structureBad[objKeys[i]].cellTextRowPlusOne = array[ROW_HEAD + 1][objVerif.column]
      structureBad[objKeys[i]].pattern = objVals[i].pattern
    }
  }

  if (Object.keys(structureNorm).length !== Object.keys(placesStructureStandard).length) {
    const styleConsoleLog = 'background: pink; color: black'
    console.log("%c Текст буфера обмена, не соответствует требуемой структуре, проблема в поле:", styleConsoleLog)
    console.log(structureBad)
    return null // NULL структура не соответствует !
  } else {
    return structureNorm // структура соответствует !
  }

}


export async function getStructureFromClipboard(placesStructureStandard) {
  const clipboardText = await getClipboardText() // получить текст из буфера обмена
  if (clipboardText === null) return null

  const arrayFromText = getArrayFromText(clipboardText) // получить массив из текста
  if (arrayFromText === null) return null

  const structurePlace = getStructureFromArray(arrayFromText, placesStructureStandard) // получить соответствие таблицы, смотрим шапку и соответствие колонок шапки (структура дома - квартиры, этажи, подъезды и прочее)

  if (!structurePlace) return "" // если объект не создан, возвращаем NULL

  return { // если объект создан, возвращаем объект
    // собираем объект места (дома), этот объект будем отправлять по кнопке
    data: {
      structurePlace: structurePlace,
      dataPlace: arrayFromText
    },
    clipboard: clipboardText
  }


}
