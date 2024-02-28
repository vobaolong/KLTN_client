const StoreCommissionLabel = ({ commission = {}, detail = true }) => (
    <span className="position-relative d-inline-block">
        <span className="badge bg-primary cus-tooltip">
            <i className="fas fa-cash-register"></i>
            {detail && <span className="ms-2">{commission.name}</span>}
        </span>

        {!detail ? (
            <small className="cus-tooltip-msg">{commission.name}</small>
        ) : (
            <small className="cus-tooltip-msg">
                {commission.name &&
                    commission.name.charAt(0).toUpperCase() +
                        commission.name.slice(1)}{' '}
                - Commission:{' '}
                {commission.cost && commission.cost.$numberDecimal}% / order
            </small>
        )}
    </span>
);

export default StoreCommissionLabel;
