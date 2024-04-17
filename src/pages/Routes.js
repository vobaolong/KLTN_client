import { lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/route/PrivateRoute'
import AdminRoute from '../components/route/AdminRoute'

//core
const HomePage = lazy(() => import('./core/HomePage'))
const ProductSearchPage = lazy(() => import('./core/ProductSearchPage'))
const StoreSearchPage = lazy(() => import('./core/StoreSearchPage'))
const UserSearchPage = lazy(() => import('./core/UserSearchPage'))
const CategoryPage = lazy(() => import('./core/CategoryPage'))
const Policy = lazy(() => import('./core/Policy'))
//admin
const AdminDashboardPage = lazy(() => import('./admin/DashboardPage'))
const AdminLevelPage = lazy(() => import('./admin/LevelPage'))
const AdminCommissionPage = lazy(() => import('./admin/CommissionPage'))
const AdminUserPage = lazy(() => import('./admin/UserPage'))
const AdminStorePage = lazy(() => import('./admin/StorePage'))
const AdminCategoryPage = lazy(() => import('./admin/CategoryPage'))
const AdminCreateCategoryPage = lazy(() => import('./admin/CreateCategoryPage'))
const AdminEditCategoryPage = lazy(() => import('./admin/EditCategoryPage'))
const AdminVariantPage = lazy(() => import('./admin/VariantPage'))
const AdminCreateVariantPage = lazy(() => import('./admin/CreateVariantPage'))
const AdminEditVariantPage = lazy(() => import('./admin/EditVariantPage'))
const AdminVariantValuesPage = lazy(() => import('./admin/VariantValuePage'))
const AdminProductPage = lazy(() => import('./admin/ProductPage'))
const AdminDeliveryPage = lazy(() => import('./admin/DeliveryPage'))
const AdminOrderPage = lazy(() => import('./admin/OrderPage'))
const AdminOrderDetailPage = lazy(() => import('./admin/OrderDetailPage'))
const AdminTransactionPage = lazy(() => import('./admin/TransactionPage'))
// account
const AccountProfilePage = lazy(() => import('./account/ProfilePage'))
const AccountAddressesPage = lazy(() => import('./account/AddressesPage'))
const AccountOrderPage = lazy(() => import('./account/OrderPage'))
const AccountFollowingPage = lazy(() => import('./account/FollowingPage'))
const AccountWalletsPage = lazy(() => import('./account/WalletPage'))
const AccountStoreManagerPage = lazy(() => import('./account/StoreManagerPage'))
const AccountCreateStorePage = lazy(() => import('./account/CreateStorePage'))
const AccountVerifyEmailPage = lazy(() => import('./account/VerifyEmailPage'))
const AccountChangePasswordPage = lazy(() =>
  import('./account/ChangePasswordPage')
)
const AccountCartPage = lazy(() => import('./account/CartPage'))
const AccountOrderDetailPage = lazy(() => import('./account/OrderDetailPage'))
const VendorProfilePage = lazy(() => import('./vendor/ProfilePage'))
const VendorDashboardPage = lazy(() => import('./vendor/DashboardPage'))
const VendorProductsPage = lazy(() => import('./vendor/ProductsPage'))
const VendorOrderPage = lazy(() => import('./vendor/OrderPage'))
const VendorOrderDetailPage = lazy(() => import('./vendor/OrderDetailPage'))
const VendorStaffsPage = lazy(() => import('./vendor/StaffsPage'))
const VendorWalletPage = lazy(() => import('./vendor/WalletPage'))
const VendorCreateProductPage = lazy(() => import('./vendor/CreateProductPage'))
const VendorEditProductPage = lazy(() => import('./vendor/EditProductPage'))
//user
// import UserAboutPage from './user/UserAboutPage'
const UserAboutPage = lazy(() => import('./user/UserAboutPage'))
//store
const StoreHomePage = lazy(() => import('./store/HomePage'))
const StoreAboutPage = lazy(() => import('./store/AboutPage'))
const StoreCollectionPage = lazy(() => import('./store/CollectionPage'))
const StoreReviewAndRatingPage = lazy(() =>
  import('./store/ReviewAndRatingPage')
)
//product
const ProductDetailPage = lazy(() => import('./product/DetailPage'))
const UserHomePage = lazy(() => import('./user/UserHomePage'))
const PageNotFound = lazy(() => import('../components/ui/PageNotFound'))
const ScrollToTops = lazy(() => import('../hooks/ScrollToTops'))

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
          component={AccountWalletsPage}
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
          path='/vendor/products/createNewProduct/:storeId'
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
