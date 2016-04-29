
export const START_DISPLAY = 'START_DISPLAY';
export function startDisplay(amount) {
  //console.log('pjdisplay',amount)
  return {
    type: START_DISPLAY,
    payload: {
      amount: amount
    }
  };
}
export const TOGGLE_DISPLAY = 'TOGGLE_DISPLAY';
export function toggleDisplay(id) {
  //console.log('pjtoggle',id)
  return {
    type: TOGGLE_DISPLAY,
    payload: {
      id: id
    }
  };
}  