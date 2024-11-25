export function getData(KEY) {
  try {
    const getData = localStorage.getItem(KEY);

    if (!getData) return;

    return JSON.parse(getData);
  } catch (e) {
    console.log(`💥Error: ${e}`);
    return;
  }
}

export function saveData(key, state) {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem(key, data);
  } catch (e) {
    console.log(`💥Error: ${e}`);
    return;
  }
}

export function clearData() {
  try {
    localStorage.clear();
  } catch (err) {
    console.log(`💥Error: ${err}`);
    return;
  }
}
