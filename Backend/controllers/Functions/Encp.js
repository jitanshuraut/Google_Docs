import bcrypt from "bcrypt";

export const encp = (text) => {
  bcrypt
    .hash(text, 10)
    .then((hash) => {
      var userHash = hash;
      console.log("Hash ", hash);
      return hash;
    })
    .catch((err) => console.error(err.message));
};

export const validate = (text, hash) => {
  bcrypt
    .compare(text, hash)
    .then((res) => {
      console.log(res); // return true
      return res;
    })
    .catch((err) => console.error(err.message));
};
