import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCategoriesTable from '../../components/table/AdminCategoriesTable'
import CategorySelector from '../../components/selector/CategorySelector'
import { useTranslation } from 'react-i18next'

const CategoryPage = () => {
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(false)

  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.category'), url: '/admin/category' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <div className='align-items-center d-flex justify-content-end'>
        <div className='position-relative d-inline-block me-2'>
          <button
            type='button'
            className={`btn ${
              flag ? 'btn-primary' : 'btn-outline-primary'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag()}
          >
            <i className='fa-solid fa-folder-tree'></i>
          </button>

          <small className='cus-tooltip-msg'>{t('categoryDetail.tree')}</small>
        </div>
      </div>

      {flag && (
        <div className='mb-4'>
          <CategorySelector isActive={true} isSelected={false} />
        </div>
      )}

      <AdminCategoriesTable heading={t('admin.categories')} />
    </AdminLayout>
  )
}

export default CategoryPage
