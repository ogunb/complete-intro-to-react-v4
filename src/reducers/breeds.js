export default function breedsReducer(state = 'Seattle, WA', action) {
  if (action.type === 'SET_ANIMAL') {
    return action.payload;
  }
  return state;
}
