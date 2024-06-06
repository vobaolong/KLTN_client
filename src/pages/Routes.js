import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/route/PrivateRoute'
import AdminRoute from '../components/route/AdminRoute'
//core
import HomePage from './core/HomePage'
import ProductSearchPage from './core/ProductSearchPage'
import StoreSearchPage from './core/StoreSearchPage'
import UserSearchPage from './core/UserSearchPage'
import CategoryPage from './core/CategoryPage'
//admin
import AdminDashboardPage from './admin/DashboardPage'
import AdminLevelPage from './admin/LevelPage'
import AdminCommissionPage from './admin/CommissionPage'
import AdminUserPage from './admin/UserPage'
import AdminStorePage from './admin/StorePage'
import AdminCategoryPage from './admin/CategoryPage'
import AdminCreateCategoryPage from './admin/CreateCategoryPage'
import AdminEditCategoryPage from './admin/EditCategoryPage'
import AdminVariantPage from './admin/VariantPage'
import AdminCreateVariantPage from './admin/CreateVariantPage'
import AdminEditVariantPage from './admin/EditVariantPage'
import AdminVariantValuesPage from './admin/VariantValuePage'
import AdminProductPage from './admin/ProductPage'
import AdminOrderPage from './admin/OrderPage'
import AdminOrderDetailPage from './admin/OrderDetailPage'
import AdminTransactionPage from './admin/TransactionPage'
//account
import AccountProfilePage from './account/ProfilePage'
import AccountAddressesPage from './account/AddressesPage'
import AccountOrderPage from './account/OrderPage'
import AccountFollowingPage from './account/FollowingPage'
import AccountWalletPage from './account/WalletPage'
import AccountStoreManagerPage from './account/StoreManagerPage'
import AccountCreateStorePage from './account/CreateStorePage'
import AccountVerifyEmailPage from './account/VerifyEmailPage'
import AccountChangePasswordPage from './account/ChangePasswordPage'
import AccountCartPage from './account/CartPage'
import AccountOrderDetailPage from './account/OrderDetailPage'
//vendor
import VendorProfilePage from './vendor/ProfilePage'
import VendorDashboardPage from './vendor/DashboardPage'
import VendorProductsPage from './vendor/ProductsPage'
import VendorOrderPage from './vendor/OrderPage'
import VendorOrderDetailPage from './vendor/OrderDetailPage'
import VendorStaffsPage from './vendor/StaffsPage'
import VendorWalletPage from './vendor/WalletPage'
import VendorCreateProductPage from './vendor/CreateProductPage'
import VendorEditProductPage from './vendor/EditProductPage'
//user
import UserHomePage from './user/UserHomePage'
import UserAboutPage from './user/UserAboutPage'
//store
import StoreHomePage from './store/HomePage'
import StoreAboutPage from './store/AboutPage'
import StoreCollectionPage from './store/CollectionPage'
import StoreReviewAndRatingPage from './store/ReviewAndRatingPage'
//product
import ProductDetailPage from './product/DetailPage'
import PageNotFound from '../components/ui/PageNotFound'
import ScrollToTops from '../hooks/ScrollToTops'
import Policy from './core/Policy'
const Routes = () => {
  return (
    <BrowserRouter>
      <ScrollToTops />
      <Switch>
        {/* core */}
        <Route path='/' exact component={HomePage} />
        <Route path='/products/search' exact component={ProductSearchPage} />
        <Route path='/stores/search' exact component={StoreSearchPage} />
        <Route path='/users/search' exact component={UserSearchPage} />
        <Route path='/category/:categoryId' exact component={CategoryPage} />
        <Route path='/legal/privacy' exact component={Policy} />

        {/* admin */}
        <AdminRoute
          path='/admin/dashboard'
          exact
          component={AdminDashboardPage}
        />
        <AdminRoute path='/admin/level' exact component={AdminLevelPage} />
        <AdminRoute
          path='/admin/commission'
          exact
          component={AdminCommissionPage}
        />
        <AdminRoute path='/admin/user' exact component={AdminUserPage} />
        <AdminRoute path='/admin/store' exact component={AdminStorePage} />
        <AdminRoute
          path='/admin/category'
          exact
          component={AdminCategoryPage}
        />
        <AdminRoute
          path='/admin/category/create'
          exact
          component={AdminCreateCategoryPage}
        />
        <AdminRoute
          path='/admin/category/edit/:categoryId'
          exact
          component={AdminEditCategoryPage}
        />
        <AdminRoute path='/admin/variant' exact component={AdminVariantPage} />
        <AdminRoute
          path='/admin/variant/create'
          exact
          component={AdminCreateVariantPage}
        />
        <AdminRoute
          path='/admin/variant/edit/:variantId'
          exact
          component={AdminEditVariantPage}
        />
        <AdminRoute
          path='/admin/variant/values/:variantId'
          exact
          component={AdminVariantValuesPage}
        />
        <AdminRoute path='/admin/product' exact component={AdminProductPage} />
        <AdminRoute path='/admin/order' exact component={AdminOrderPage} />
        <AdminRoute
          path='/admin/order/detail/:orderId'
          exact
          component={AdminOrderDetailPage}
        />
        <AdminRoute
          path='/admin/transaction'
          exact
          component={AdminTransactionPage}
        />

        {/* account */}
        <PrivateRoute
          path='/account/profile'
          exact
          component={AccountProfilePage}
        />
        <PrivateRoute
          path='/account/addresses'
          exact
          component={AccountAddressesPage}
        />
        <PrivateRoute
          path='/account/purchase'
          exact
          component={AccountOrderPage}
        />
        <PrivateRoute
          path='/account/purchase/detail/:orderId'
          exact
          component={AccountOrderDetailPage}
        />
        <PrivateRoute
          path='/account/following'
          exact
          component={AccountFollowingPage}
        />
        <PrivateRoute
          path='/account/wallet'
          exact
          component={AccountWalletPage}
        />
        <PrivateRoute
          path='/account/store'
          exact
          component={AccountStoreManagerPage}
        />
        <PrivateRoute
          path='/account/store/create'
          exact
          component={AccountCreateStorePage}
        />
        <PrivateRoute path='/cart' exact component={AccountCartPage} />
        <Route
          path='/verify/email/:emailCode'
          exact
          component={AccountVerifyEmailPage}
        />
        <Route
          path='/change/password/:passwordCode'
          exact
          component={AccountChangePasswordPage}
        />

        {/* vendor */}
        <PrivateRoute
          path='/vendor/:storeId'
          exact
          component={VendorDashboardPage}
        />
        <PrivateRoute
          path='/vendor/profile/:storeId'
          exact
          component={VendorProfilePage}
        />
        <PrivateRoute
          path='/vendor/products/:storeId'
          exact
          component={VendorProductsPage}
        />
        <PrivateRoute
          path='/vendor/products/addNew/:storeId'
          exact
          component={VendorCreateProductPage}
        />
        <PrivateRoute
          path='/vendor/products/edit/:productId/:storeId'
          exact
          component={VendorEditProductPage}
        />
        <PrivateRoute
          path='/vendor/orders/:storeId'
          exact
          component={VendorOrderPage}
        />
        <PrivateRoute
          path='/vendor/orders/detail/:orderId/:storeId'
          exact
          component={VendorOrderDetailPage}
        />
        <PrivateRoute
          path='/vendor/staffs/:storeId'
          exact
          component={VendorStaffsPage}
        />
        <PrivateRoute
          path='/vendor/Wallet/:storeId'
          exact
          component={VendorWalletPage}
        />

        {/* user */}
        <Route path='/user/:userId' exact component={UserHomePage} />
        <Route path='/user/about/:userId' exact component={UserAboutPage} />

        {/* store */}
        <Route path='/store/:storeId' exact component={StoreHomePage} />
        <Route
          path='/store/collection/:storeId'
          exact
          component={StoreCollectionPage}
        />
        <Route
          path='/store/rating/:storeId'
          exact
          component={StoreReviewAndRatingPage}
        />
        <Route path='/store/about/:storeId' exact component={StoreAboutPage} />

        {/* product */}
        <Route path='/product/:productId' exact component={ProductDetailPage} />
        {/* Route 404 */}
        <Route path='*' exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
