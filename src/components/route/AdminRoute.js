import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../apis/auth';

const AdminRoute = ({ component: Page, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                getToken() && getToken().role === 'admin' ? (
                    <Page {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default AdminRoute;
