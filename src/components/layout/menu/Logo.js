const Logo = ({ noBackground = false }) => (
  <div className='logo d-inline-block d-flex flex-nowrap align-items-end'>
    <h1
      className={`logo m-0 unselect rounded ${
        !noBackground ? 'bg-primary text-main' : 'bg-main logo_text'
      }`}
    >
      <span
        className={`px-2 me-1b rounded ${
          !noBackground ? 'bg-main logo_text' : 'bg-primary text-main'
        }`}
      >
        Zen
      </span>
      Metic
    </h1>
  </div>
)

export default Logo
