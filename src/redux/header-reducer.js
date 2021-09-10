const SAVE_ACTIVE_SECTION = 'SAVE_ACTIVE_SECTION' // сохранить текущую активную секцию

let initialState = {
  visibleStatus: true,
  activeSection: 'unLive',
  activeChild: 'SneshSkazkaLive',
  arraySection: ['live', 'unLive','realtor', 'ways'],
  arraySectionHide: ['ways'],
  sections: {
    live : {
      bg: 'small',
      bg_color: 'red'
    }
  },


}

const headerReducer = (state = initialState, action) => {

  switch (action.type) {

    case SAVE_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.activeSection
      }

    default:
      return state;

  }

}

export const saveActiveSection = (activeSection) => ({
  type: SAVE_ACTIVE_SECTION,
  activeSection
})

export default headerReducer
