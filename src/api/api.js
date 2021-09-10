import {constBuilds} from "lib/js/constants";

export async function sendDataToUrl({data, url}) {
  const res1 = await fetch(url, {
    method: 'POST',
    header: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })

  if (!res1.ok) {
    throw  new Error(`Could not fetch: ${url}` + `, received ${res1.status}`)
  }
  // console.log("good1")
  let res2 = res1.text()

  return res2
}

//---------------------------------------------------------------
// получить данные по URL
async function getDataFromUrl(url) {
  const res1 = await fetch(url, {
    method: 'GET',
    header: {'Content-Type': 'application/json'}
  })

  if (!res1.ok) {
    throw  new Error(`Could not fetch: ${url}` + `, received ${res1.status}`)
  }
  return await res1.json()
}

//---------------------------------------------------------------
export async function getArrayPlaces() {
  const arrayNamesPlaces = [[constBuilds.SNESH_SKAZKA]] // список мест ??? в будущем переделать, список брать с бекенда автоматом...
  // const arrayNamesPlaces = ["sneshSkazka"] // список мест ??? в будущем переделать, список брать с бекенда автоматом...

  const prefix = "https://api.pbk-perm.ru/live/"
  let resultDataArray = {} // объект для формирования, ключ->значение (ключ - имя места, значение - массив данных места)

  for (const item of arrayNamesPlaces) {
    resultDataArray[item] = await getDataFromUrl(prefix + item)
  }
  return resultDataArray
}
