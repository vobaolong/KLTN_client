import MainLayout from './MainLayout';
import AccountSideBar from './menu/AccountSideBar';

const AccountLayout = ({ user = {}, children = null }) => (
    <MainLayout>
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-md-2 col-lg-3 res-sticky-top-md mb-4">
                    <AccountSideBar user={user} />
                </div>

                <div className="col-md-10 col-lg-9">{children}</div>
            </div>
        </div>
    </MainLayout>
);

export default AccountLayout;
