import { useTranslation } from 'react-i18next'
import { ProgressBar } from 'react-bootstrap'

const determineRank = (points) => {
  if (points < 20) {
    return { nextRank: 'Silver', nextRankPoints: 20 }
  } else if (points < 100) {
    return { nextRank: 'Gold', nextRankPoints: 100 }
  } else if (points < 1000) {
    return { nextRank: 'Diamond', nextRankPoints: 1000 }
  } else {
    return { nextRank: '', nextRankPoints: 1000 }
  }
}
const UserRankInfo = ({ user = {}, border = true }) => {
  const { t } = useTranslation()
  const { nextRank, nextRankPoints } = determineRank(user.point || 0)
  const previousRankPoints =
    nextRankPoints === 20
      ? 0
      : nextRankPoints === 100
      ? 20
      : nextRankPoints === 1000
      ? 100
      : 1000
  const progress =
    nextRankPoints !== null
      ? ((user.point - previousRankPoints) /
          (nextRankPoints - previousRankPoints)) *
        100
      : 100

  return (
    <div className='container-fluid'>
      <div
        className='row border rounded-2 p-3'
        style={{ backgroundColor: `${user.level?.color}` }}
      >
        <div className='d-flex flex-column text-white'>
          <h4 className='text-uppercase mb-0'>{t(`${user.level?.name}`)}</h4>
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <div className='rounded-2 bg-body p-3 mt-2 d-grid'>
          {user.point < 1000 && (
            <span className='text-primary'>
              Để nâng cấp thứ hạng thẻ tiếp theo
            </span>
          )}
          <span>Đơn hàng</span>
          <span>
            <span className='text-primary'>{user.point}</span>/{nextRankPoints}
          </span>
          <div className='d-flex align-items-center'>
            <ProgressBar
              style={{ width: '90%' }}
              variant='warning'
              animated
              now={progress}
            />
            <div className='ms-2 text-end'>{t(`${nextRank}`)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRankInfo
