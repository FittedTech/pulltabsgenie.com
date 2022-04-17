    

export const saveWizardDetails = (wizardData) => dispatch => { 
    dispatch({
        type: 'SAVE_WIZARD_ENTRY',
        payload: wizardData
    });
}