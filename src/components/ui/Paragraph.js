const Paragraph = ({
  value = '',
  label = '',
  multiLine = false,
  time = '',
  colon = false,
  des = ''
}) => (
  // <div className='cus-paragraph-group flex-container'>
  //   <span className='cus-paragraph-group-label text-nowrap'>{label}</span>
  //   <div className='cus-paragraph-group-colon text-nowrap'>
  //     {colon ? ':' : ''}
  //   </div>
  //   <span className='cus-paragraph-group-time text-nowrap'>{time}</span>
  //   {!multiLine ? (
  //     <span className='cus-paragraph-group-paragraph form-control'>
  //       {value}
  //     </span>
  //   ) : (
  //     value.split(/\n/).map((v, i) => (
  //       <span
  //         key={i}
  //         className='cus-paragraph-group-paragraph form-control'
  //         style={{ textAlign: 'justify' }}
  //       >
  //         {v}
  //       </span>
  //     ))
  //   )}
  // </div>
  <div className='cus-paragraph-group flex-container'>
    <div className='cus-paragraph-group-label text-nowrap'>{label}</div>
    <div className='cus-paragraph-group-colon text-nowrap'>
      {colon ? ':' : ''}
    </div>
    <div className='cus-paragraph-group-time text-nowrap'>{time}</div>
    {!multiLine ? (
      <div className='cus-paragraph-group-paragraph form-control ps-0'>
        {value}
      </div>
    ) : (
      value.split(/\n/).map((v, i) => (
        <div
          key={i}
          className='cus-paragraph-group-paragraph form-control ps-0'
          style={{ textAlign: 'justify' }}
        >
          {v}
        </div>
      ))
    )}
    <div>{des}</div>
  </div>
)

export default Paragraph
