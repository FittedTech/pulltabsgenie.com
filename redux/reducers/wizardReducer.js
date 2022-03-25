let initialState = {
    history: []
};
  
export const wizardReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_WIZARD_ENTRY': 
          state.history.push(action.payload);
          return state;
      default:
        return state
    }
}