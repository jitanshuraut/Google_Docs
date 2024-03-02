export const checker = (arr, key) => {
  for (const obj of arr) {
    if (obj.User_ID_hash == key) {
      return obj.Permission;
    }
  }
  return "none";
};
