import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listActiveCategories } from '../../../apis/category'
import Logo from './Logo'

//cre: Scanfcode.com footer template
const Footer = (props) => {
  const [categories, setCategories] = useState([])

  const loadCategories = () => {
    listActiveCategories({
      search: '',
      categoryId: null,
      sortBy: 'name',
      order: 'asc',
      limit: 6,
      page: 1
    })
      .then((data) => {
        if (data.error) return
        else setCategories(data.categories)
      })
      .catch((error) => {
        return
      })
  }

  useEffect(() => loadCategories(), [])

  return (
    <footer className='site-footer'>
      <div className='container-md'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <div className='mb-4'>
              <div className='mb-2 d-block'>
                <Logo />
              </div>
              <p style={{ textAlign: 'justify' }}>
                <b>ZenMetic - Thật nhanh, thật chất lượng, thật rẻ</b>
                <p className='text-muted'>
                  <p className='mt-2 font-weight-bold'>ZenMetic có tất cả</p>
                  <small className='lh-1'>
                    Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín,
                    hàng nghìn loại mặt hàng từ Điện thoại smartphone tới Rau củ
                    quả tươi, kèm theo dịch vụ giao hàng siêu tốc ZenNOW,
                    ZenMetic mang đến cho bạn một trải nghiệm mua sắm online bắt
                    đầu bằng chữ tín.
                  </small>
                </p>
                <p className='text-muted'>
                  <p className='mt-2 font-weight-bold'>
                    Khuyến mãi, ưu đãi tràn ngập
                  </p>
                  <small>
                    Bạn muốn săn giá sốc, ZenMetic có giá sốc mỗi ngày cho bạn!
                    Bạn là tín đồ của các thương hiệu, các cửa hàng Official
                    chính hãng đang chờ đón bạn. Không cần săn mã freeship, vì
                    ZenMetic đã có hàng triệu sản phẩm trong chương trình
                    Freeship+, không giới hạn lượt đặt, tiết kiệm thời gian vàng
                    bạc của bạn. Gói ZenNOW (Áp dụng đơn hàng trên 200k) tiết
                    kiệm để nhận 100% free ship 2h & trong ngày, áp dụng cho
                    100% sản phẩm, 100% tỉnh thành Việt Nam.
                  </small>
                </p>
              </p>
            </div>
          </div>

          <div className='col-xs-6 col-md-3'>
            <h6>Danh mục sản phẩm</h6>
            <ul className='footer-links'>
              {categories &&
                categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      className='link-hover'
                      to={`/category/${category._id}`}
                      title={category.name}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className='col-xs-6 col-md-3'>
            <h6>Truy cập nhanh</h6>
            <ul className='footer-links'>
              <li>
                <Link className='link-hover text-reset' to='#'>
                  Về ZenMetic
                </Link>
              </li>
              <li>
                <Link className='link-hover text-reset' to='#'>
                </Link>
              </li>
              <li>
                <Link className='link-hover text-reset' to='/legal/privacy'>
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className='container-md'>
        <div className='row'>
          <div className='col-md-8 col-sm-6 col-xs-12'>
            <p className='copyright-text text-center'>
              Copyright &copy; {new Date().getFullYear()} All Rights Reserved by{' '}
              <Link className='link-hover text-reset' to='#'>
                ZenMetic
              </Link>
              .
            </p>
          </div>

          <div className='col-md-4 col-sm-6 col-xs-12'>
            <ul className='social-icons'>
              <li>
                <a
                  className='social'
                  href='https://www.facebook.com/baolong317/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-facebook'></i>
                </a>
              </li>
              <li>
                <Link className='social' to='#'>
                  <i className='fab fa-google'></i>
                </Link>
              </li>
              <li>
                <a
                  className='social'
                  href='https://github.com/vobaolong/KLTN_client'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-github'></i>
                </a>
              </li>
              <li>
                <a
                  className='social'
                  href='https://www.linkedin.com/in/v%C3%B5-b%E1%BA%A3o-long-486ba9265/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-linkedin'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
