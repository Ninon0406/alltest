export function canChoose(state, choice) {
  return Object.entries(choice.req ?? {}).every(([key, minimum]) =>
    (key === 'gold' ? state.gold : state.stats[key]) >= minimum);
}
