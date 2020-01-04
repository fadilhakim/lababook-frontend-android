function syncActions (arrFn = []) {
  return arrFn.reduce(async (prev, curr) => {
    await prev

    return curr()
  }, Promise.resolve())
}

export default syncActions
