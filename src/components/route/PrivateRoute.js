import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../apis/auth';

const PrivateRoute = ({ component: Page, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            getToken() ? (
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

export default PrivateRoute;
