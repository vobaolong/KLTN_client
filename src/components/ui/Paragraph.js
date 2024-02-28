const Paragraph = ({ value = '-', label = '-', multiLine = false }) => (
  <div className='cus-paragraph-group'>
    <label className='cus-paragraph-group-label text-nowrap'>{label}</label>
    {!multiLine ? (
      <p className='cus-paragraph-group-paragraph form-control'>{value}</p>
    ) : (
      value.split(/\n/).map((v, i) => (
        <p
          key={i}
          className='cus-paragraph-group-paragraph form-control'
          style={{ textAlign: 'justify' }}
        >
          {v}
        </p>
      ))
    )}
  </div>
)

export default Paragraph
