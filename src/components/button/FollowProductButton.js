import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { followProduct, unfollowProduct } from '../../apis/follow';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const FollowProductButton = ({
    productId = '',
    isFollowing = false,
    className = '',
    onRun,
}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [followingFlag, setFollowingFlag] = useState(isFollowing);

    const { _id, accessToken } = getToken();

    useEffect(() => {
        setFollowingFlag(isFollowing);
    }, [isFollowing, productId]);

    const handleFollowProduct = () => {
        setError('');
        setIsLoading(true);
        if (!followingFlag) {
            followProduct(_id, accessToken, productId)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                        setTimeout(() => {
                            setError('');
                        }, 3000);
                    } else {
                        setFollowingFlag(true);
                        if (onRun) {
                            data.product.isFollowing = true;
                            onRun(data.product);
                        }
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                });
        } else {
            unfollowProduct(_id, accessToken, productId)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                        setTimeout(() => {
                            setError('');
                        }, 3000);
                    } else {
                        setFollowingFlag(false);
                        if (onRun) {
                            data.product.isFollowing = false;
                            onRun(data.product);
                        }
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                });
        }
    };

    return (
        <button
            type="button"
            className={`btn ${
                followingFlag ? 'btn-pink' : 'btn-outline-pink'
            } ripple ${className}`}
            onClick={handleFollowProduct}
        >
            {isLoading && <Loading size="small" />}
            {error ? (
                <Error msg={error} />
            ) : followingFlag ? (
                <span>
                    <i className="fas fa-heart"></i>
                    <span className="ms-2 res-hide-md">Following</span>
                </span>
            ) : (
                <span>
                    <i className="far fa-heart"></i>
                    <span className="ms-2 res-hide-md">Follow</span>
                </span>
            )}
        </button>
    );
};
export default FollowProductButton;
