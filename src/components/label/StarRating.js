const StarRating = ({ stars = 5, noStar = false }) => {
  const render = () => {
    let content = []
    for (let i = 1; i <= stars; i++) {
      content.push(<i className='fa-solid fa-star link-golden' key={i - 1}></i>)
    }
    if (!noStar)
      for (let i = stars + 1; i <= 5; i++) {
        content.push(
          <i className='fa-light fa-star text-black-50' key={i - 1}></i>
        )
      }
    return content
  }

  return <span className='star-rating d-inline-block'>{render()}</span>
}

export default StarRating
