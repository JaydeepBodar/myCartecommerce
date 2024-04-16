import Newsletter from "../model/Newsletter";
import Userschema from "../model/Userschema";
export const newsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(500).json({ message: "Please enter your email" });
  } else {
    const findemail = await Userschema.find({ email: email });
    if (findemail.length > 0) {
      res.status(409).json({ message: "Your email are alredy register for newsleter" });
    } else {
      const emailfind = await Newsletter.find({ email: email });
      if (emailfind.length > 0) {
        res.status(403).json({ message: "You are alreday subscribe with us" });
      } else {
        const emailsend = await Newsletter.create(req.body);
        res.status(200).json({ message: "Thank you for subscribe us!" });
      }
    }
  }
};
