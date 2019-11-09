function getObjectByKey (pk, objs, key = 'pk') {
  const id = parseInt(pk)
  return objs.find(obj => { return obj[key] === id })
}

exports.getObjectByKey = getObjectByKey
