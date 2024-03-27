import { lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/route/PrivateRoute'
import AdminRoute from '../components/route/AdminRoute'

//core
// import HomePage from './core/HomePage'
// import ProductSearchPage from './core/ProductSearchPage'
// import StoreSearchPage from './core/StoreSearchPage'
// import UserSearchPage from './core/UserSearchPage'
// import CategoryPage from './core/CategoryPage'
// import Policy from './core/Policy'
const HomePage = lazy(() => import('./core/HomePage'))
const ProductSearchPage = lazy(() => import('./core/ProductSearchPage'))
const StoreSearchPage = lazy(() => import('./core/StoreSearchPage'))
const UserSearchPage = lazy(() => import('./core/UserSearchPage'))
const CategoryPage = lazy(() => import('./core/CategoryPage'))
const Policy = lazy(() => import('./core/Policy'))
//admin

// import AdminDashboardPage from './admin/DashboardPage'
// import AdminLevelPage from './admin/LevelPage'
// import AdminCommissionPage from './admin/CommissionPage'
// import AdminUserPage from './admin/UserPage'
// import AdminStorePage from './admin/StorePage'
// import AdminCategoryPage from './admin/CategoryPage'
// import AdminCreateCategoryPage from './admin/CreateCategoryPage'
// import AdminEditCategoryPage from './admin/EditCategoryPage'
// import AdminStylePage from './admin/StylePage'
// import AdminCreateStylePage from './admin/CreateStylePage'
// import AdminEditStylePage from './admin/EditStylePage'
// import AdminStyleValuesPage from './admin/StyleValuePage'
// import AdminProductPage from './admin/ProductPage'
// import AdminDeliveryPage from './admin/DeliveryPage'
// import AdminOrderPage from './admin/OrderPage'
// import AdminOrderDetailPage from './admin/OrderDetailPage'
// import AdminTransactionPage from './admin/TransactionPage'
const AdminDashboardPage = lazy(() => import('./admin/DashboardPage'))
const AdminLevelPage = lazy(() => import('./admin/LevelPage'))
const AdminCommissionPage = lazy(() => import('./admin/CommissionPage'))
const AdminUserPage = lazy(() => import('./admin/UserPage'))
const AdminStorePage = lazy(() => import('./admin/StorePage'))
const AdminCategoryPage = lazy(() => import('./admin/CategoryPage'))
const AdminCreateCategoryPage = lazy(() => import('./admin/CreateCategoryPage'))
const AdminEditCategoryPage = lazy(() => import('./admin/EditCategoryPage'))
const AdminStylePage = lazy(() => import('./admin/StylePage'))
const AdminCreateStylePage = lazy(() => import('./admin/CreateStylePage'))
const AdminEditStylePage = lazy(() => import('./admin/EditStylePage'))
const AdminStyleValuesPage = lazy(() => import('./admin/StyleValuePage'))
const AdminProductPage = lazy(() => import('./admin/ProductPage'))
const AdminDeliveryPage = lazy(() => import('./admin/DeliveryPage'))
const AdminOrderPage = lazy(() => import('./admin/OrderPage'))
const AdminOrderDetailPage = lazy(() => import('./admin/OrderDetailPage'))
const AdminTransactionPage = lazy(() => import('./admin/TransactionPage'))
//account
// import AccountProfilePage from './account/ProfilePage'
// import AccountAddressesPage from './account/AddressesPage'
// import AccountPurchasePage from './account/PurchasePage'
// import AccountFollowingPage from './account/FollowingPage'
// import AccountWalletsPage from './account/WalletPage'
// import AccountStoreManagerPage from './account/StoreManagerPage'
// import AccountCreateStorePage from './account/CreateStorePage'
// import AccountVerifyEmailPage from './account/VerifyEmailPage'
// import AccountChangePasswordPage from './account/ChangePasswordPage'
// import AccountCartPage from './account/CartPage'
// import AccountOrderDetailPage from './account/OrderDetailPage'
const AccountProfilePage = lazy(() => import('./account/ProfilePage'))
const AccountAddressesPage = lazy(() => import('./account/AddressesPage'))
const AccountPurchasePage = lazy(() => import('./account/PurchasePage'))
const AccountFollowingPage = lazy(() => import('./account/FollowingPage'))
const AccountWalletsPage = lazy(() => import('./account/WalletPage'))
const AccountStoreManagerPage = lazy(() => import('./account/StoreManagerPage'))
const AccountCreateStorePage = lazy(() => import('./account/CreateStorePage'))
const AccountVerifyEmailPage = lazy(() => import('./account/VerifyEmailPage'))
const AccountChangePasswordPage = lazy(() => import('./account/ChangePasswordPage'))
const AccountCartPage = lazy(() => import('./account/CartPage'))
const AccountOrderDetailPage = lazy(() => import('./account/OrderDetailPage'))
//vendor
// import VendorProfilePage from './vendor/ProfilePage'
// import VendorDashboardPage from './vendor/DashboardPage'
// import VendorProductsPage from './vendor/ProductsPage'
// import VendorOrdersPage from './vendor/OrdersPage'
// import VendorOrderDetailPage from './vendor/OrderDetailPage'
// import VendorStaffsPage from './vendor/StaffsPage'
// import VendorWalletPage from './vendor/WalletPage'
// import VendorCreateProductPage from './vendor/CreateProductPage'
// import VendorEditProductPage from './vendor/EditProductPage'
const VendorProfilePage = lazy(() => import('./vendor/ProfilePage'))
const VendorDashboardPage = lazy(() => import('./vendor/DashboardPage'))
const VendorProductsPage = lazy(() => import('./vendor/ProductsPage'))
const VendorOrdersPage = lazy(() => import('./vendor/OrdersPage'))
const VendorOrderDetailPage = lazy(() => import('./vendor/OrderDetailPage'))
const VendorStaffsPage = lazy(() => import('./vendor/StaffsPage'))
const VendorWalletPage = lazy(() => import('./vendor/WalletPage'))
const VendorCreateProductPage = lazy(() => import('./vendor/CreateProductPage'))
const VendorEditProductPage = lazy(() => import('./vendor/EditProductPage'))
//user
// import UserAboutPage from './user/UserAboutPage'
const UserAboutPage = lazy(() => import('./user/UserAboutPage'))
//store
// import StoreHomePage from './store/HomePage'
// import StoreAboutPage from './store/AboutPage'
// import StoreCollectionPage from './store/CollectionPage'
// import StoreReviewAndRatingPage from './store/ReviewAndRatingPage'
const StoreHomePage = lazy(() => import('./store/HomePage'))
const StoreAboutPage = lazy(() => import('./store/AboutPage'))
const StoreCollectionPage = lazy(() => import('./store/CollectionPage'))
const StoreReviewAndRatingPage = lazy(() => import('./store/ReviewAndRatingPage'))
//product
// import ProductDetailPage from './product/DetailPage'
// import ScrollToTops from '../hooks/ScrollToTops'
// import PageNotFound from '../components/ui/PageNotFound'
// import AdminSettingPage from './admin/SettingPage'
// import UserHomePage from './user/UserHomePage'
const ProductDetailPage = lazy(() => import('./product/DetailPage'))
const AdminSettingPage = lazy(() => import('./admin/SettingPage'))
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
				<AdminRoute path='/admin/setting' exact component={AdminSettingPage} />
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
					path='/account/wallet'
					exact
					component={AccountWalletsPage}
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
					path='/vendor/products/editproduct/:productId/:storeId'
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
		</BrowserRouter >
	)
}

export default Routes
