import getRawBody from "raw-body";
import Stripe from "stripe";
import mongoose from "mongoose";
import orderSchema from "../model/Orderschema";
import moment from "moment";
import Userschema from "../model/Userschema";
import nodemailer from "nodemailer";
import APIFilter from "../utils/APIFilter";
const stripe = new Stripe(process.env.STRIPE_SECERETKEY);
export const checkoutsession = async (req, res) => {
  const body = req.body;
  const line_items = body?.items?.map((item) => {
    // console.log("itemdddddddddd", item);
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.title,
          images: [item?.thumbnail],
          metadata: {
            productId: item?._id,
            size: item.size,
            color: item?.color,
            onlydiscount: item?.onlydiscount,
            retailerId: item?.retailerId,
            orderStatus: "Processing",
          },
        },
        unit_amount: item?.discountprice * 100,
      },
      quantity: item.quantity,
    };
  });
  async function isFirstTimeCustomer(customerId) {
    try {
      const charges = await stripe.charges.list({
        customer: customerId,
        limit: 1,
      });

      return charges.data.length === 0;
    } catch (error) {
      console.error("Error checking customer charges:", error);
      return false;
    }
  }
  const isFirstTime = await isFirstTimeCustomer(body?.id);
  console.log("body?.idbody?.idbody?.id", body?.id);
  const shipinginfo = body?.shippingInfo;
  const sessionCreatedata = {
    payment_method_types: ["card"],
    success_url: `${process.env.API_URL}User/Order?order_success=true`,
    cancel_url: `${process.env.API_URL}`,
    customer_email: body?.email,
    client_reference_id: body?.id,
    mode: "payment",
    metadata: { shipinginfo },
    shipping_options: [
      {
        shipping_rate: "shr_1Ns00tSFLEGSzdCiZBp6sjeM",
      },
    ],
    line_items,
  };
  if (isFirstTime) {
    console.log(
      "NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNnnnnnnnnn--------------------"
    );
    const coupon = await stripe.coupons.create({
      percent_off: 20,
      duration: "once",
    });
    const promotionCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      max_redemptions: 1,
    });
    sessionParams.discounts = [
      {
        discount: promotionCode.id,
      },
    ];
  }
  const session = await stripe.checkout.sessions.create(sessionCreatedata);
  console.log("line_itemsline_itemsline_itemsline_items", session);
  res.status(200).json({ url: session.url });
};
// const getCartitems = async (line_items) => {
//   console.log(
//     "line_items?.data",
//     line_items.data.map((val) => val.price)
//   );
//   return new Promise((resolve, reject) => {
//     let cartItems = [];
//     line_items?.data?.forEach(async (item) => {
//       // console.log("itemitemitem", item);
//       // console.log("itemdataatata", item)
//       const product = await stripe.products.retrieve(item?.price?.product);
//       const productid = product?.metadata?.productId;
//       cartItems?.push({
//         product: productid,
//         name: product.name,
//         image: product.images,
//         onlydiscount: product?.metadata?.onlydiscount,
//         price: item?.price?.unit_amount / 100,
//         quantity: item.quantity,
//         size: product?.metadata?.size,
//         color: product?.metadata?.color,
//         retailerId: product?.metadata?.retailerId,
//         orderStatus: product?.metadata?.orderStatus,
//       });
//       console.log("cartItemscartItemscartItems", cartItems);
//       if (cartItems?.length === line_items?.data?.length) {
//         // console.log("resolvedatatatatatatta")
//         resolve(cartItems);
//       }
//     });
//   });
// };
export const webhook = async (req, res) => {
  try {
    const rawbody = await getRawBody(req);
    console.log("reqreqreqreqreqreq", rawbody);
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      rawbody,
      signature,
      process.env.WEBHOOKS_SECERATKEY_PRODUCTION
      // process.env.API_URL === 'https://my-cartecommerce-ljdm.vercel.app/' ? process.env.WEBHOOKS_SECERATKEY_PRODUCTION : process.env.WEBHOOKS_SECERATKEY
    );
    // console.log("event", event);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );
      console.log(
        "sessionline_itemsline_itemsline_itemsline_itemsline_items",
        session
      );
      let orderItems = [];
      const userId = session?.client_reference_id;
      await Promise.all(
        line_items?.data?.map(async (item) => {
          const product = await stripe.products.retrieve(item?.price?.product);
          const productid = product?.metadata?.productId;
          const orderItem = {
            user: userId,
            shippingInfo: session?.metadata?.shipinginfo,
            product: productid,
            name: product.name,
            image: product.images,
            onlydiscount: product?.metadata?.onlydiscount,
            price: item?.price?.unit_amount / 100,
            quantity: item.quantity,
            size: product?.metadata?.size,
            color: product?.metadata?.color,
            retailerId: product?.metadata?.retailerId,
            orderStatus: product?.metadata?.orderStatus,
            paymentId: session?.payment_intent,
            status: session?.payment_status,
            amountPaid: item?.price?.unit_amount / 100,
          };
          orderItems.push(orderItem);
        })
      );
      console.log(
        "OrderdataOrderdataOrderdataOrderdataOrderdataOrderdata",
        session
      );
      const order = await orderSchema.insertMany(orderItems);
      const orderDataget = await orderSchema
        .find({ _id: order[0]?._id })
        .populate("shippingInfo user retailerId");
      const orderdate = moment(orderDataget[0]?.createdAt).format(
        "MMM DD, YYYY"
      );
      const currentyear = new Date().getFullYear();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_SECREAT_KEY,
        },
      });
      if (orderItems?.length > 0) {
        const mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: session.customer_email,
          subject: `Order placed Succssefully #${orderDataget[0]?._id}`,
          html: `<html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Order Confirmation Email</title>
              <style type="text/css">
                  body {
                      margin: 0;
                      padding: 0;
                      width: 100% !important;
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                      font-family: Helvetica, Arial, sans-serif;
                  }
                  table {
                      border-collapse: collapse;
                  }
                  img {
                      border: 0;
                      display: block;
                  }
                  a {
                      text-decoration: none;
                  }
                  .backgroundTable {
                      margin: 0;
                      padding: 0;
                      width: 100% !important;
                  }
                  .devicewidth {
                      width: 600px;
                      margin: 40px auto;
                  }
                  .devicewidthinner {
                      width: 90%;
                      margin: 0 auto;
                  }
          
                  @media screen and (max-width: 600px) {
                      .devicewidthinner {
                          width: 100% !important;
                      }
                      .devicewidth {
                          width: 100% !important;
                      }
                      .mobile-hide {
                          display: none !important;
                      }
                      .mobile-center {
                          text-align: center !important;
                      }
                  }
              </style>
          </head>
          <body>
              <table cellpadding="0" cellspacing="0" border="0" class="backgroundTable" style="background-color: #d5d5d5; width: 100%;">
                  <tbody>
                      <tr>
                          <td>
                              <table align="center" cellpadding="15" cellspacing="0" border="0" class="devicewidth" style="background-color: #ffffff;">
                                  <tbody>
                                      <tr>
                                          <td style="padding-top: 30px;">
                                              <table align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee; text-align: center;">
                                                  <tbody>
                                                      <tr>
                                                          <td style="padding-bottom: 10px;">
                                                              <a href="https://my-cartecommerce-ljdm.vercel.app/"><img src="https://res.cloudinary.com/dxlicroam/image/upload/v1717680222/logo_prguyz.png" style="margin:0 auto; width:100px; height:75px; background-size: cover;" alt="myCart" /></a>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                              2156 Mall Road
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                              India, 007
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                              Phone: 755-522-6677 | Email: ${
                                                                process.env
                                                                  .NODEMAILER_EMAIL
                                                              }
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;">
                                                              <strong>Order Number:</strong> ${
                                                                orderDataget[0]
                                                                  ?._id
                                                              } | <strong>Order Date:</strong> ${orderdate}
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="padding-top: 0;">
                                              <table align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb;">
                                                  <tbody>
                                                      <tr>
                                                          <td style="width: 100%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;" class="mobile-center">
                                                              Delivery Address
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666;">
                                                              ${
                                                                orderDataget[0]
                                                                  ?.user?.name
                                                              }
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666;">
                                                            ${
                                                              orderDataget[0]
                                                                ?.shippingInfo
                                                                ?.street
                                                            } ${
            orderDataget[0]?.shippingInfo?.city
          } ${orderDataget[0]?.shippingInfo?.state}
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
                                                              ${
                                                                orderDataget[0]
                                                                  ?.shippingInfo
                                                                  ?.country
                                                              } ${
            orderDataget[0]?.shippingInfo?.zipcode
          }
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="padding-top: 0;">
                                              <table align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee;">
                                                  <tbody>
                                                      <tr>
                                                          <td rowspan="4" style="padding-right: 10px; padding-bottom: 10px;">
                                                              <img style="height: 80px;" src=${
                                                                orderDataget[0]
                                                                  ?.image[0]
                                                              } alt=${
            orderDataget[0]?.name
          } />
                                                          </td>
                                                          <td colspan="2" style="font-size: 14px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                          ${
                                                            orderDataget[0]
                                                              ?.name
                                                          }
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #757575; width: 440px;">
                                                              Quantity: ${
                                                                orderDataget[0]
                                                                  ?.quantity
                                                              }
                                                          </td>
                                                          <td class="mobile-hide" style="width: 130px;"></td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #757575;">
                                                              Color: <span style="width:10px; height:10px; border-radius:50%; background-color:${
                                                                orderDataget[0]
                                                                  ?.color
                                                              }; display: inline-block;;"></span>
                                                          </td>
                                                          <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right;">
                                                              ${
                                                                orderDataget[0]
                                                                  ?.amountPaid
                                                              }₹ Per Unit
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #757575; padding-bottom: 10px;">
                                                              ${
                                                                orderDataget[0]
                                                                  ?.size === "-"
                                                                  ? ""
                                                                  : `Size: ${orderDataget[0]?.size}`
                                                              }
                                                          </td>
                                                          <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; padding-bottom: 10px;">
                                                              <b style="color: #666666;">${
                                                                orderDataget[0]
                                                                  ?.amountPaid
                                                              }₹</b> Total
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="padding-top: 0;">
                                              <table align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb; margin-top: -5px;">
                                                  <tbody>
                                                      <tr>
                                                          <td rowspan="5" style="width: 55%;" class="mobile-hide"></td>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                              Sub-Total:
                                                          </td>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                          ${
                                                            orderDataget[0]
                                                              ?.amountPaid
                                                          }₹
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee;">
                                                              Shipping Fee:
                                                          </td>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">
                                                              0₹
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px;">
                                                              Order Total
                                                          </td>
                                                          <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; text-align: right;">
                                                          ${
                                                            orderDataget[0]
                                                              ?.amountPaid
                                                          }₹
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666;">
                                                              Payment Term:
                                                          </td>
                                                          <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; text-align: right;">
                                                              100%
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td colspan="2" style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;">
                                                              Delivery within 7-10 business days
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="padding-top: 0;">
                                              <table align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb; text-align: center;">
                                                  <tbody>
                                                  <tr>
                                                  <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; padding-bottom: 10px;">
                                                      <a href="${
                                                        process.env.API_URL ===
                                                        "https://my-cartecommerce-ljdm.vercel.app"
                                                          ? "https://my-cartecommerce-ljdm.vercel.app"
                                                          : process.env.API_URL
                                                      }/User/Order/${
            orderDataget[0]?._id
          }" style="display: inline-block;padding: 7px 0; text-align: center; background-color: #197693; color: #ffffff; width: 130px; border-radius: 15px; letter-spacing: 0.8px; font-size: 13px;">View Your Order</a>
                                                  </td>
                                              </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; padding-bottom: 10px;">
                                                              Payment Method: Card
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="padding-top: 0; padding-bottom: 30px;">
                                              <table align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="text-align: center;">
                                                  <tbody>
                                                      <tr>
                                                          <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 25px;">
                                                              Thank you for your business!
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666; padding-top: 10px;">
                                                              For more details, please visit our website
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666; padding-top: 10px;">
                                                              <a href="https://my-cartecommerce-ljdm.vercel.app/" style="color: #197693;">https://my-cartecommerce-ljdm.vercel.app/</a>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666; padding-top: 10px;">
                                                              Or email us at <a href=${
                                                                process.env
                                                                  .NODEMAILER_EMAIL
                                                              } style="color: #197693;">${
            process.env.NODEMAILER_EMAIL
          }</a>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="font-size: 14px; line-height: 18px; color: #666666; padding-top: 10px;">
                                                              &copy; ${currentyear} myCart. All rights reserved.
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </body>
          </html>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(401).json({ status: 401, message: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ success: "true" });
          }
        });
      }
      // console.log("orderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", order);
    }
  } catch (e) {
    console.log("error", e);
  }
};
export const getOrder = async (req, res) => {
  try {
    const productperpage = 6;
    const productcount = await orderSchema
      .find({ user: req.user._id })
      .countDocuments();
    const apiFilter = new APIFilter(orderSchema.find(), req.query).pagination(
      productperpage
    );
    const order = await apiFilter.query
      .find({ user: req.user._id })
      .populate("shippingInfo user");
    res.status(200).json({ order, productperpage, productcount });
  } catch (e) {
    res.status(400).json({ message: "order not found" });
  }
};
export const getsingleuserorder = async (req, res) => {
  const { id } = req.query;
  const order = await orderSchema
    .findById({ _id: id, user: req.user._id })
    .populate("shippingInfo user retailerId");
  res.status(200).json({ order });
};
export const updateOrder = async (req, res) => {
  try {
    const orderdata = await orderSchema
      .findByIdAndUpdate(req.query.id, req.body, { new: true })
      .populate("shippingInfo user retailerId");
    console.log("orderdata", orderdata);
    res.status(200).json({ message: "Succsessfully updated Order status" });
  } catch (e) {
    res.status(400).json({ message: "Not update Order" });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const deletedata = await orderSchema.findByIdAndDelete(
      req.query.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message:
        "Successfully Delete Order and refund will be back within 3-5 Buisness days",
    });
  } catch (e) {
    res.status(400).json({ message: "Order not deleted" });
  }
};
export const getSingleOrder = async (req, res) => {
  try {
    const order = await orderSchema
      .findById(req.query.id)
      .populate("user shippingInfo retailerId");
    res.status(200).json({ order });
  } catch (e) {
    res.status(400).json({ message: "Order not shown" });
  }
};
export const getallOrder = async (req, res) => {
  try {
    const productperpage = 6;
    const productcount = await orderSchema.countDocuments();
    const apifillter = new APIFilter(orderSchema.find(), req.query).pagination(
      productperpage
    );
    const order = await apifillter.query.find().populate("retailerId");
    res.status(200).json({ order, productcount, productperpage });
  } catch (e) {
    res.status(400).json({ message: "Order not found" });
  }
};
export const getallOrderforretailer = async (req, res) => {
  try {
    const productperpage = 6;
    const productcount = await orderSchema.countDocuments();
    const apifillter = new APIFilter(orderSchema.find(), req.query).pagination(
      productperpage
    );
    const order = await apifillter.query.find({ retailerId: req.user._id });
    res.status(200).json({ order, productcount, productperpage });
  } catch (e) {
    res.status(400).json({ message: "Order not found" });
  }
};
export const orderanylitic = async (req, res) => {
  const { retailer } = req.query;
  const orderbystatus1 =
    retailer?.length > 0
      ? await orderSchema
          .find({ retailerId: retailer, orderStatus: "Delivered" })
          .countDocuments()
      : await orderSchema.find({ orderStatus: "Delivered" }).countDocuments();
  const orderbystatus2 =
    retailer?.length > 0
      ? await orderSchema
          .find({ retailerId: retailer, orderStatus: "Processing" })
          .countDocuments()
      : await orderSchema.find({ orderStatus: "Processing" }).countDocuments();
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const orderAnalysis =
    retailer?.length > 0
      ? await orderSchema.aggregate([
          {
            $match: {
              retailerId: new mongoose.Types.ObjectId(retailer),
            },
          },
          {
            $project: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              revenue: { $toDouble: "$amountPaid" },
            },
          },
          {
            $group: {
              _id: { year: "$year", month: "$month" },
              totalRevenue: { $sum: "$revenue" },
            },
          },
          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },
        ])
      : await orderSchema.aggregate([
          {
            $project: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              revenue: { $toDouble: "$amountPaid" },
            },
          },
          {
            $group: {
              _id: { year: "$year", month: "$month" },
              totalRevenue: { $sum: "$revenue" },
            },
          },
          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },
        ]);
  // Create a map to quickly access totalRevenue by year and month
  const totalRevenueMap = new Map(
    orderAnalysis.map((item) => [
      `${item._id.year}-${item._id.month}`,
      item.totalRevenue,
    ])
  );
  // Create the final result including all months and years
  const resultWithAllMonthsAndYears = allMonths.flatMap((month) => {
    return Array.from(new Set(orderAnalysis.map((item) => item._id.year))).map(
      (year) => ({
        month,
        year,
        totalRevenue:
          totalRevenueMap.get(`${year}-${allMonths.indexOf(month) + 1}`) || 0,
      })
    );
  });

  res.json({ orderbystatus1, orderbystatus2, resultWithAllMonthsAndYears });
};
