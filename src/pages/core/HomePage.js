import MainLayout from '../../components/layout/MainLayout';
import ListCategories from '../../components/list/ListCategories';
import ListBestSellerProduct from '../../components/list/ListBestSellerProduct';
import ListHotStores from '../../components/list/ListHotStores';

const HomePage = () => {
    return (
        <MainLayout container="container-lg" navFor="user">
            <div className="mb-4">
                <ListCategories heading="Discover" />
            </div>

            <div className="mb-4">
                <ListBestSellerProduct heading="Best Seller" />
            </div>

            <div className="mb-4">
                <ListHotStores heading="Hot Stores" />
            </div>
        </MainLayout>
    );
};

export default HomePage;
