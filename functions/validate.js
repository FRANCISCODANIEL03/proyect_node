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

