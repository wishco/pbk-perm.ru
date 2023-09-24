import {
  getAllPlacesFromServer,
  getArrayPlaces,
  getDataFromUrl,
} from "api/api";
import { updateDataFromLocalStorage } from "redux/forms-values-reducer";
import { constBuilds, constPlaces } from "lib/js/constants";

const INITIALIZE_STRUCTURE = "INITIALIZE_STRUCTURE"; // инициализация структуры программы
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"; // инициализация приложения успешна
const ADD_PLACE = "ADD_PLACE"; // добавление места в массив

const CHANGE_FIELD_OF_BUILD_SELECT = "CHANGE_FIELD_OF_BUILD_SELECT"; // изменение выбранного поля

let initialState = {
  initialized: false,
  places: {}, //!!! надо получить таблицу, данные из Excel (берём с сервера)
  buildOptions: {
    // опции зданий
    [constBuilds.SNESH_SKAZKA]: {
      // nameBuild - имя здания
      typesRoomTypicalFilter: ["П1", "П2-", "П2s-", "П3"], // тип комнаты (1-однокомн, 2-двухкомн, 3-трехкомн, 2s-евродвушка
      typesRoomTypicalAll: [
        {
          type: "П1",
          text1: "Однокомнатные",
          text2: "от 3 млн.руб.",
          text3: "площадь от 30 кв.м.",
        },
        {
          type: "П2-",
          text1: "Двухкомнатные",
          text2: "от 4.2 млн.руб.",
          text3: "площадь от 48 кв.м.",
        },
        {
          type: "П2s-",
          text1: "Евродвушки",
          text2: "от 4.5 млн.руб.",
          text3: "площадь от 54 кв.м.",
        },
        {
          type: "П3",
          text1: "Трёхкомнатные",
          text2: "от 5.9 млн.руб.",
          text3: "площадь от 66 кв.м.",
        },
      ],
      entranceCount: 4, // кол-во подъездов
      entranceArrayExists: [1, 2, 3, 4], // какие подъезды в продаже (существуют)
      entranceRightToLeft: true, // ререверс направления подъездов
      floorArrayExists: [1, 2, 3, 4, 5, 6], // какие этажи в продаже (существуют)
      filterOn: true,
    },
  },
  buildSelect: {
    [constBuilds.SNESH_SKAZKA]: {
      // nameBuild - имя здания
      // ниже, это fieldName
      typeRoom: null, // выбранный тип комнаты
      entrance: null, // выбранный подъезд
      floor: null, // выбранный этаж
      room: null, // выбранная квартира
      status: [1, 2, 3],
    },
  },
  placesStructureStandard: {
    roomId: { column: constPlaces.roomId, pattern: "квартира" }, // номер квартиры
    areaLiveCount: { column: constPlaces.areaLiveCount, pattern: "комнат" }, // количество комнат в квартире
    entrance: { column: constPlaces.entrance, pattern: "Подъезд" }, // подъезд
    floor: { column: constPlaces.floor, pattern: "Этаж" }, // Этаж
    areaFull: { column: constPlaces.areaFull, pattern: "Общая" }, // площадь общая (жилая+кухня=полная)
    areaLive: { column: constPlaces.areaLive, pattern: "Жилая" }, // площадь жилая
    areaKitchen: { column: constPlaces.areaKitchen, pattern: "Кухня" }, // площадь кухня
    pay100ForM2: { column: constPlaces.pay100ForM2, pattern: "ипотек" }, // цена, оплата 100%, за метр.кв
    pay100ForRoom: { column: constPlaces.pay100ForRoom, pattern: "стоимость" }, // стоимость
    payPartForM2: { column: constPlaces.payPartForM2, pattern: "рассроч" }, // цена, оплата в рассрочку, за метр.кв
    payPartForRoom: {
      column: constPlaces.payPartForRoom,
      pattern: "стоимость в рассрочку",
    }, // стоимость в рассрочку
    status: { column: constPlaces.status, pattern: "Статус" }, // статус заказа 1-бронь 2-продано
    typeRoom: { column: constPlaces.typeRoom, pattern: "планиров" },
    typeRoomPic: { column: constPlaces.typeRoomPic, pattern: "Картинка" },
  },
  dataConstants: {
    telSelf1: "+7(342)259-33-34",
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_STRUCTURE:
      return {
        ...state,
        places: action.places, //!!! данные с сервера, со всех текстовых файлов (с содержанием данных мест - домов)
      };
    case INITIALIZED_SUCCESS:
      console.log({
        ...state,
        initialized: true,
      });
      return {
        ...state,
        initialized: true,
      };

    case CHANGE_FIELD_OF_BUILD_SELECT:
      let _out = {
        ...state.buildSelect[action.buildFieldChange.nameBuild],
        [action.buildFieldChange.fieldName]: action.buildFieldChange.fieldValue,
      };
      let _isEqualNowAndLast =
        state.buildSelect[action.buildFieldChange.nameBuild][
          action.buildFieldChange.fieldName
        ] === action.buildFieldChange.fieldValue;

      if (_isEqualNowAndLast && !action.buildFieldChange.toggleOff) {
        _out = {
          ...state.buildSelect[action.buildFieldChange.nameBuild],
          [action.buildFieldChange.fieldName]: null,
        };
      } // если старое значение равно новому И toggle не отключен, то снимаем выбор

      return {
        ...state,
        buildSelect: {
          ...state.buildSelect,
          [action.buildFieldChange.nameBuild]: _out,
        },
      };

    // case ADD_PLACE:
    //   return {
    //     ...state
    //   }

    default:
      return state;
  }
};
export const add_place = () => ({ type: ADD_PLACE });

export const changeFieldOfBuildSelect = (buildFieldChange) => ({
  type: CHANGE_FIELD_OF_BUILD_SELECT,
  buildFieldChange,
});

export const initializeStructure = (places) => ({
  type: INITIALIZE_STRUCTURE,
  places: places,
});
export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
  dispatch(updateDataFromLocalStorage());
  getArrayPlaces().then((res) => {
    // получить объект из мест, каждое место содержит массив данных {xxx1: [[...,...]]}...}
    dispatch(initializeStructure(res)); //!!! инициализировать данные программы (в будущем брать с сервера нужные данные)
    dispatch(initializedSuccess());
  });
};

export default appReducer;
