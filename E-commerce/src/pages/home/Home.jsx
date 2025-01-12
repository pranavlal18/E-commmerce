
import Category from "../../components/category/category";
import Hero from "../../components/herosection/Hero";
import HomePageProductCard from "../../components/homepageproductcard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/track";
const Home = () => {
    return ( 
        <Layout>
            <Hero />
            <Category />
            <HomePageProductCard />
            <Track />
            
            <Testimonial />
            <Loader />

        </Layout>
     );
}
 
export default Home;