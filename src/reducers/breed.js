export default function breedReducer(state = 'Seattle, WA', action) {
  if (action.type === 'SET_BREED') {
    return action.payload;
  }
  if (action.type === 'SET_ANIMAL') {
    return '';
  }
  return state;
}
