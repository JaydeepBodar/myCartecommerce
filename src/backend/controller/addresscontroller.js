import Addressschema from "../model/Addressschema";
export const postAddress = async (req, res) => {
  console.log("req.body", req.body);
  const { city, street, state, country, zipcode, phoneNo } = req.body;
  const address = await Addressschema.create({
    city,
    street,
    state,
    country,
    zipcode,
    phoneNo,
  });

  if (!req.body) {
    res.status(400).json({ message: "All field are Required" });
  } else {
    res.status(200).json({ address, message: "address add successfully" });
  }
};
export const getAddress = async (req, res) => {
  const address = await Addressschema.find();
  res.status(200).json({ address });
};
