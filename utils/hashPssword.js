import bcrypt from "bcryptjs";

const hashPssword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password, hashPssword) => {
  const correctPassword = await bcrypt.compare(password, hashPssword);
  return correctPassword;
};

export default hashPssword;
