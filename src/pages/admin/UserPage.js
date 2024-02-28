import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminUsersTable from '../../components/table/AdminUsersTable';

const UserPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AdminLayout user={user}>
            <AdminUsersTable />
        </AdminLayout>
    );
};

export default UserPage;
