import getRawBody from "raw-body";
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
			tax_rates: ["txr_1Nco0nSFLEGSzdCihpokz2Tv"],
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
        shipping_rate: "shr_1Nco1WSFLEGSzdCi2gt2wxo3",
      },
    ],
    line_items,
  });
	// console.log("sessionurl",session)
  res.status(200).json({ url: session.url });
};
export const webhook=async(req,res)=>{
  const rawbody=await getRawBody(req)
  const signature=req.headers["stripe-signature"]
  const event=stripe.webhooks.constructEvent(rawbody,signature,process.env.WEBHOOKS_SECERATKEY)
  if(event.type === "checkout.session.completed"){
      const session=event.data.object
      const line_items=await stripe.checkout.sessions.listLineItems(event.data.object.id)
      console.log("line_items",line_items)
  }
}