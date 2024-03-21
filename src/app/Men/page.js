import Breadcrumb from "@/Component/Breadcrumb";
import Commonproduct from "@/Component/Commonproduct";
const Manpage = () => {
  const menfilterproduct=["mens-shoes","mens-watches","men's clothing","sunglasses"]

  return (
    <div>
      <Breadcrumb title="/Men"/>
      <Commonproduct filterdata={menfilterproduct}/>
    </div>
  );
};

export default Manpage;
