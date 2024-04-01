import MainLayout from './MainLayout'
import StoreNav from './menu/StoreNav'
import Cover from '../image/Cover'
import Avatar from '../image/Avatar'
import StoreStatusLabel from '../label/StoreStatusLabel'
import StoreLevelInfo from '../info/StoreLevelInfo'

const StoreLayout = ({ store = {}, children = null }) => (
  <MainLayout>
    <div className='store-layout'>
      <div className='position-relative bg-white p-3 rounded-top-3'>
        <Cover cover={store.cover} alt={store.name} />
        <div className='avatar-absolute avatar-absolute--store'>
          <Avatar
            avatar={store.avatar}
            name={
              <span className='d-inline-flex justify-content-center align-items-center'>
                {store.name}
                <small className='ms-2'>
                  <StoreStatusLabel isOpen={store.isOpen} />
                </small>
              </span>
            }
            alt={store.name}
            borderName={true}
          />
        </div>
        <div className='level-group-absolute res-hide bg-white w-50 h-100'>
          <StoreLevelInfo store={store} />
        </div>
      </div>
    </div>

    <StoreNav store={store} />

    <div className='store-page-main mt-3'>{children}</div>
  </MainLayout>
)

export default StoreLayout

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actionCreators from '../../actions/store';

// function mapStateToProps(state) {
//     return { store: state.store.store }
// }

// function mapDispatchToProps(dispatch) {
//     return { actions: bindActionCreators({ actionCreators }, dispatch) }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StoreLayout);
