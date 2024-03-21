import Breadcrumb from '@/Component/Breadcrumb';
import Commonproduct from '@/Component/Commonproduct';
const Womenpage = () => {
  const womencategory=["womens-bags","womens-watches","womens-bags","women's clothing"]

    return (
      <div>
        <Breadcrumb title="/Women"/>
        <Commonproduct filterdata={womencategory} />
      </div>
    );
}

export default Womenpage
