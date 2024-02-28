import MainLayout from './MainLayout';
import AdminSideBar from './menu/AdminSideBar';

const AdminLayout = ({ user = {}, children = null }) => (
    <MainLayout container="container-fluid" navFor="admin">
        <div className="row">
            <div className="col-md-2 res-sticky-top-md mb-4">
                <AdminSideBar user={user} />
            </div>

            <div className="col-md-10">{children}</div>
        </div>
    </MainLayout>
);

export default AdminLayout;
