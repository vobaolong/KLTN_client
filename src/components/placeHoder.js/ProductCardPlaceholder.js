import React from 'react'
import ContentLoader from 'react-content-loader'

const ProductCardPlaceholder = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={400}
    viewBox='0 0 400 400'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    {/* Placeholder cho hình ảnh sản phẩm */}
    <rect x='0' y='0' rx='3' ry='3' width='100%' height='200' />
    {/* Placeholder cho tiêu đề sản phẩm */}
    <rect x='0' y='220' rx='3' ry='3' width='80%' height='20' />
    {/* Placeholder cho giá sản phẩm */}
    <rect x='0' y='250' rx='3' ry='3' width='60%' height='20' />
    {/* Placeholder cho đánh giá sản phẩm */}
    <rect x='0' y='280' rx='3' ry='3' width='40%' height='20' />
    {/* Placeholder cho nút theo dõi sản phẩm */}
    <rect x='0' y='320' rx='3' ry='3' width='100%' height='40' />
  </ContentLoader>
)

export default ProductCardPlaceholder
