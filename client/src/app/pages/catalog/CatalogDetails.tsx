import { Container } from "@mui/material"
import ProductDetails from "../../components/products/ProductDetails"
import Layout from "../../layout/Layout"

function CatalogDetails() {
   return (
      <Layout>
         <Container>
            <ProductDetails />
         </Container>
      </Layout>
   )
}

export default CatalogDetails
