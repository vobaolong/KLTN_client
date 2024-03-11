import React from 'react'
import { FacebookShareButton, TwitterShareButton } from 'react-share'

function ProductShareButton({ product }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const title =
    typeof document !== 'undefined'
      ? document.title
      : 'Check out this awesome content!'

  return (
    <div className='share-buttons'>
      <FacebookShareButton url={shareUrl} quote={title}>
        Share on Facebook
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        Share on Twitter
      </TwitterShareButton>
    </div>
  )
}

export default ProductShareButton
