import Breadcrumb from "@/Component/Breadcrumb";
import Commonproduct from "@/Component/Commonproduct";
import Container from "@/Component/Container";
const specialdeal = () => {
  return (
    <Container>
      <Breadcrumb title="Specialdeal"/>
      <Commonproduct category={20} />
    </Container>
  );
};

export default specialdeal;
