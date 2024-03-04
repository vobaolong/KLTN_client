import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/route/PrivateRoute'
import AdminRoute from '../components/route/AdminRoute'
//core
import HomePage from './core/HomePage'
import ProductSearchPage from './core/ProductSearchPage'
import StoreSearchPage from './core/StoreSearchPage'
import UserSearchPage from './core/UserSearchPage'
import CategoryPage from './core/CategoryPage'
import Policy from './core/Policy'
//admin
import AdminDashboardPage from './admin/DashboardPage'
import AdminLevelPage from './admin/LevelPage'
import AdminCommissionPage from './admin/CommissionPage'
import AdminUserPage from './admin/UserPage'
import AdminStorePage from './admin/StorePage'
import AdminCategoryPage from './admin/CategoryPage'
import AdminCreateCategoryPage from './admin/CreateCategoryPage'
import AdminEditCategoryPage from './admin/EditCategoryPage'
import AdminStylePage from './admin/StylePage'
import AdminCreateStylePage from './admin/CreateStylePage'
import AdminEditStylePage from './admin/EditStylePage'
import AdminStyleValuesPage from './admin/StyleValuePage'
import AdminProductPage from './admin/ProductPage'
import AdminDeliveryPage from './admin/DeliveryPage'
import AdminOrderPage from './admin/OrderPage'
import AdminOrderDetailPage from './admin/OrderDetailPage'
import AdminTransactionPage from './admin/TransactionPage'
//account
import AccountProfilePage from './account/ProfilePage'
import AccountAddressesPage from './account/AddressesPage'
import AccountPurchasePage from './account/PurchasePage'
import AccountFollowingPage from './account/FollowingPage'
import AccountGDCoinsPage from './account/GDCoinsPage'
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
import VendorOrdersPage from './vendor/OrdersPage'
import VendorOrderDetailPage from './vendor/OrderDetailPage'
import VendorStaffsPage from './vendor/StaffsPage'
import VendorGDCoinsPage from './vendor/GDCoinsPage'
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
import ScrollToTops from '../hooks/ScrollToTops'
import PageNotFound from '../components/ui/PageNotFound'

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
          path='/admin/category/createNewCategory'
          exact
          component={AdminCreateCategoryPage}
        />
        <AdminRoute
          path='/admin/category/editCategory/:categoryId'
          exact
          component={AdminEditCategoryPage}
        />
        <AdminRoute path='/admin/style' exact component={AdminStylePage} />
        <AdminRoute
          path='/admin/style/createNewStyle'
          exact
          component={AdminCreateStylePage}
        />
        <AdminRoute
          path='/admin/style/editStyle/:styleId'
          exact
          component={AdminEditStylePage}
        />
        <AdminRoute
          path='/admin/style/values/:styleId'
          exact
          component={AdminStyleValuesPage}
        />
        <AdminRoute path='/admin/product' exact component={AdminProductPage} />
        <AdminRoute
          path='/admin/delivery'
          exact
          component={AdminDeliveryPage}
        />
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
          component={AccountPurchasePage}
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
          path='/account/GDCoins'
          exact
          component={AccountGDCoinsPage}
        />
        <PrivateRoute
          path='/account/storeManager'
          exact
          component={AccountStoreManagerPage}
        />
        <PrivateRoute
          path='/account/storeManager/createNewStore'
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
          path='/vendor/products/createNewProduct/:storeId'
          exact
          component={VendorCreateProductPage}
        />
        <PrivateRoute
          path='/vendor/products/editProduct/:productId/:storeId'
          exact
          component={VendorEditProductPage}
        />
        <PrivateRoute
          path='/vendor/orders/:storeId'
          exact
          component={VendorOrdersPage}
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
          path='/vendor/GDCoins/:storeId'
          exact
          component={VendorGDCoinsPage}
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
          path='/store/review&rating/:storeId'
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
