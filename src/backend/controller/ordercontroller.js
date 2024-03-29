import getRawBody from "raw-body";
import Stripe from "stripe";
import orderSchema from "../model/Orderschema";
import APIFilter from "../utils/APIFilter";
const stripe = new Stripe(process.env.STRIPE_SECERETKEY);
export const checkoutsession = async (req, res) => {
  const body = req.body;
  const line_items = body?.items?.map((item) => {
    // console.log("itemdddddddddd", item)
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.title,
          images: [item?.thumbnail],
          metadata: { productId: item?._id },
        },
        unit_amount: item?.discountprice * 100,
      },
      tax_rates: ["txr_1Ns02KSFLEGSzdCiV4DSB8Ye"],
      quantity: item.quantity,
    };
  });
  // console.log("line_items datatata",line_items[0].price_data)
  const shipinginfo = body?.shippingInfo;
  const session = await stripe.checkout.sessions.create({
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
  });
  // console.log("sessionurl",session)
  res.status(200).json({ url: session.url });
};
const getCartitems = async (line_items) => {
  // console.log("line_items?.data", line_items)
  return new Promise((resolve, reject) => {
    let cartItems = [];
    line_items?.data?.forEach(async (item) => {
      console.log("itemitemitem", item);
      // console.log("itemdataatata", item)
      const product = await stripe.products.retrieve(item?.price?.product);
      // console.log("productdetails", product)
      const productid = product?.metadata?.productId;
      cartItems?.push({
        product: productid,
        name: product.name,
        image: product.images,
        discount: item?.onlydiscount,
        price: item?.price?.unit_amount / 100,
        quantity: item.quantity,
      });
      if (cartItems?.length === line_items?.data?.length) {
        // console.log("resolvedatatatatatatta")
        resolve(cartItems);
      }
    });
  });
};
export const webhook = async (req, res) => {
  try {
    const rawbody = await getRawBody(req);
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
      // console.log("session", session);
      const getOrder = await getCartitems(line_items);
      console.log("getOrder", getOrder);
      const userId = session?.client_reference_id;
      const amountPaid = session?.amount_total / 100;
      const paymentInfo = {
        id: session?.payment_intent,
        status: session?.payment_status,
        taxPaid: session?.total_details?.amount_tax / 100,
        amountPaid,
      };
      const orderData = {
        user: userId,
        shippingInfo: session?.metadata?.shipinginfo,
        orderItems: getOrder,
        paymentInfo,
      };
      // console.log("orderData",orderData)
      const order = await orderSchema.create(orderData);
      // console.log("orderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", order);
      res.status(200).json({ success: "true" });
    }
  } catch (e) {
    console.log("error", e);
  }
};
export const getOrder = async (req, res) => {
  try {
    const productperpage = 3;
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
export const updateOrder = async (req, res) => {
  try {
    const orderdata = await orderSchema.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );
    // console.log("req.body", req.body);
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
      .populate("shippingInfo user");
    res.status(200).json({ order });
  } catch (e) {
    res.status(400).json({ message: "Product not shown" });
  }
};
export const getallOrder = async (req, res) => {
  try {
    const productperpage = 6;
    const productcount = await orderSchema.countDocuments();
    const apifillter = new APIFilter(orderSchema.find(), req.query).pagination(
      productperpage
    );
    const order = await apifillter.query.find();
    // console.log("ordergggggggggggggggg",order)
    res.status(200).json({ order, productcount, productperpage });
  } catch (e) {
    res.status(400).json({ message: "Order not found" });
  }
};

export const orderanylitic = async (req, res) => {
  const orderbystatus1 = await orderSchema
    .find({ orderStatus: "Delivered" })
    .countDocuments();
  const orderbystatus2 = await orderSchema
    .find({ orderStatus: "Processing" })
    .countDocuments();
    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // const targetMonth = "Jan"; // Replace with the desired month
    
    const orderAnalysis = await orderSchema.aggregate([
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          revenue: { $toDouble: "$paymentInfo.amountPaid" },
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
    const totalRevenueMap = new Map(orderAnalysis.map(item => [`${item._id.year}-${item._id.month}`, item.totalRevenue]));
    
    // Create the final result including all months and years
    const resultWithAllMonthsAndYears = allMonths.flatMap(month => {
      return Array.from(new Set(orderAnalysis.map(item => item._id.year))).map(year => ({
        month,
        year,
        totalRevenue: totalRevenueMap.get(`${year}-${allMonths.indexOf(month) + 1}`) || 0,
      }));
    });
    
  res.json({ orderbystatus1, orderbystatus2, resultWithAllMonthsAndYears });
};
