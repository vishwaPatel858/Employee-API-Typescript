import bcrypt from "bcrypt";

export const generateEncryptedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  let encryptedPass = await bcrypt.hash(password, salt);
  return encryptedPass;
};

export const validatePassword = async (
  password: string,
  encryptedPass: string
) => {
  const validatePass = await bcrypt.compare(password, encryptedPass);
  return validatePass;
};
