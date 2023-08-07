import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECERETKEY);
export const checkoutsession = async (req, res) => {
  const body = req.body;
  const line_items = body?.items?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.thumbnail],
          metadata: {productId:item._id},
        },
        unit_amount: item.price * 100,
      },
			tax_rates: ["txr_1NcR8qSFLEGSzdCivrzZ1H3P"],
			quantity: item.quantity,
    };
  })
  const shipinginfo = body?.shippingInfo;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.API_URL}User/Order?order_success=true`,
    cancel_url: `${process.env.API_URL}`,
    customer_email: body.email,
    client_reference_id: body.id,
    mode: "payment",
    metadata: { shipinginfo },
    shipping_options: [
      {
        shipping_rate: "shr_1NcQxhSFLEGSzdCiFS6zPC7I",
      },
    ],
    line_items,
  });
	// console.log("sessionurl",session)
  res.status(200).json({ url: session.url });
};
