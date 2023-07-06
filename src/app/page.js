import Productlist from '@/Component/product/Productlist'

async function getData() {
  const data = await fetch(`${process.env.API}/api/products`, {
    cache: "no-store",
  });
  if (!data) {
    console.log("error");
  }
  return data.json();
}
export default async function Home() {
  const product = await getData();
  return (
      <Productlist product={product}/>
  )
} 
