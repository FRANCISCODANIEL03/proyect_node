function createProduct(data) {
  // Validación de tipo y valores
  if (typeof data.nombre !== "string" || data.nombre.trim() === "") {
    return false;
  }
  if (typeof data.precio !== "number" || data.precio < 0) {
    return false;
  }
  if (typeof data.stock !== "number" || data.stock < 0) {
    return false;
  }
  return true;
}

function updateProduct(data) {
  // Validaciones de datos
  if (data.nombre && typeof data.nombre !== "string") {
    return false
  }

  if (data.precio && (isNaN(data.precio) || data.precio <= 0)) {
    return false
  }

  if (data.stock && (!Number.isInteger(data.stock) || data.stock < 0)) {
    return false
  }
  return true
}

module.exports = { createProduct, updateProduct };


