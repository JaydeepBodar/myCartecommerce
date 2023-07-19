import Userschema from '../model/Userschema';
import bcrypt from 'bcrypt'
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Userschema.findOne({ email: email });
  if (user) {
    res.status(400).json({ message: "User alreday exists" });
  } else {
    const haspassword = await bcrypt.hash(password,10);
    const userdata = await Userschema.create({
      name: name,
      email: email,
      password: haspassword,
    });
    console.log("userdata", userdata);
    res.status(200).json({message: "Successfully register" });
  }
};
