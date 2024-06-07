import Userschema from "../model/Userschema";
import bcrypt from "bcrypt";
import APIFilter from "../utils/APIFilter";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await Userschema.findOne({ email: email });
  if (user) {
    res.status(400).json({ message: "User alreday exists" });
  } else {
    const haspassword = await bcrypt.hash(password, 10);
    const userdata = await Userschema.create({
      name: name,
      email: email,
      password: haspassword,
      role: role,
    });
    // console.log("userdata", userdata);
    res.status(200).json({ message: "Successfully register" });
  }
};
export const updateUser = async (req, res) => {
  const updateuser = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
  };
  // if (req.files?.length > 0) {
  //   const uploader = async (path) => await uploads(path, "uploadimg/myCartEcommerce/Userprofile");
  //   const file = req.files[0];
  //   const { path } = file;
  //   const avatarResponse = await uploader(path);
  //   console.log("avtatarResponse",avatarResponse)
  //   fs.unlinkSync(path);
  //   updateuser.avatar=avatarResponse
  // }
  const user = await Userschema.updateOne({ _id: req.body._id }, updateuser, {
    new: true,
  });

  // console.log("user", user);
  res.status(200).json({ message: "Successfully Update Profile" });
};
export const update_password = async (req, res) => {
  const { currentpassword, newpassword, id } = req.body;
  const user = await Userschema.find({ _id: id });
  // console.log("user", user);
  const comparePassword = await bcrypt.compare(
    currentpassword,
    user[0].password
  );
  // console.log("dadadaadaddafsfdw", comparePassword);
  if (!comparePassword) {
    res.status(400).json({ message: "Wrong password try again" });
  } else {
    user[0].password = await bcrypt.hash(newpassword, 10);
    await user[0].save();
    // console.log("user",user)
    // console.log("user.password", user.password);e
    res.status(200).json({ message: "Password updated successfully" });
  }
};
// export const getUser=async(req,res)=>{
//     const user=await
// }
export const getUser = async (req, res) => {
  // console.log("req.user._id",req.user._id)
  const user = await Userschema.find({ _id: req.user._id });
  res.status(200).json(user);
};
export const getalluser = async (req, res) => {
  try {
    const userperPage = 6;
    const totaluser = await Userschema.countDocuments();
    const apiFilter = new APIFilter(Userschema.find(), req.query).pagination(
      userperPage
    );
    const allUser = await apiFilter.query.find();
    res.status(200).json({ allUser, userperPage, totaluser });
  } catch (e) {
    res.status(400).json({ message: "No user Found Bad Request" });
  }
};
export const updateUserRole = async (req, res) => {
  try {
    const orderdata = await Userschema.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Succsessfully update user Role" });
  } catch (e) {
    res.status(400).json({ message: "Not update user role" });
  }
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_SECREAT_KEY,
  },
});
export const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(405).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await Userschema.findOne({ email: email });
    if (email) {
      const token = jwt.sign({ _id: userfind._id }, process.env.RESET_SECREAT, {
        expiresIn: "600s",
      });

      const setusertoken = await Userschema.findByIdAndUpdate(
        { _id: userfind._id },
        { verifytoken: token },
        { new: true }
      );
      if (setusertoken) {
        const mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: email,
          subject: "Reset Password",
          html: ` <table
                          role="presentation"
                          style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(255, 255, 255);"
                        >
                          <tbody>
                            <tr>
                              <td
                                align="center"
                                style="padding: 1rem 2rem; vertical-align: top; width: 100%;"
                              >
                                <table
                                  role="presentation"
                                  style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;"
                                >
                                  <tbody>
                                    <tr>
                                      <td style="padding:0px 0px 40px 0px;">
                                        <div style="padding: 20px; background-color: rgb(239, 239, 239);">
                                          <div style="color: rgb(0, 0, 0); text-align: left;">
                                            <h1 style="margin: 1rem 0">Trouble signing in?</h1>
                                            <p>
                                              We've received a request to reset the password for
                                              this user account, and this link valid for only 10 minutes
                                            </p>
                                            <p style="padding-bottom: 16px">
                                              <a
                                                href=${process.env.API_URL}/Authentication/Forgotpassword/${userfind.id}/${setusertoken.verifytoken}
                                                // target="_blank"
                                                style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0; text-decoration:none"
                                              >
                                                Reset your password
                                            </a>
                                            <p>
                                              If you didn't ask to reset your password, you can
                                              ignore this email.
                                            </p>
                                            <p style="padding-top: 16px">
                                              Thanks,</p>
                                              <p style="padding-top:10px;">myCart team<p>
                                              <img
                                              src="https://res.cloudinary.com/dxlicroam/image/upload/v1713345213/logo_lrnabv.png"
                                              alt="Company logo"
                                              style="padding-top:10px; width: 50px; height:30px display:block"
                                            />
                                          
                                          </div>
                                        </div>
                                        <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                                          <p style="padding-bottom: 16px">Made with ♥ in India</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(401).json({ status: 401, message: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res
              .status(201)
              .json({ status: 201, message: "Email sent Succsfully" });
          }
        });
      }
    } else {
      res.status(401).json({ message: "Invalid Email" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid Email" });
  }
};

export const forgotpasswordverify = async (req, res) => {
  const { id, token } = req.query;
  const verifyToken = jwt.verify(token, process.env.RESET_SECREAT);
  try {
    const validuser = await Userschema.findOne({ _id: id, verifytoken: token });
    if (verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "Link Was expired" });
  }
};
export const changePassword = async (req, res) => {
  const { id, token } = req.query;
  const { password } = req.body;
  try {
    const validuser = await Userschema.findOne({ _id: id, verifytoken: token });
    const verifyToken = jwt.verify(token, process.env.RESET_SECREAT);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 12);

      const setnewuserpass = await Userschema.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );

      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
