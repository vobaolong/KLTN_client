/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getToken } from "../../../apis/auth";
import { createOrder } from "../../../apis/order";
import { getStoreLevel } from "../../../apis/level";
import { getCommissionByStore } from "../../../apis/commission";
import Loading from "../../ui/Loading";
import Error from "../../ui/Error";
import ConfirmDialog from "../../ui/ConfirmDialog";
import UserAddAddressItem from "../../item/UserAddAddressItem";
import useUpdateDispatch from "../../../hooks/useUpdateDispatch";
import { regexTest } from "../../../helper/test";
import { convertVNDtoUSD } from "../../../helper/formatPrice";
import vnpayImage from "../../../assets/vnpay-seeklogo.svg";
import {
  totalDelivery,
  totalProducts,
  totalCommission,
} from "../../../helper/total";
import { formatPrice } from "../../../helper/formatPrice";
import Logo from "../../layout/menu/Logo";
import Input from "../../ui/Input";
import DropDownMenu from "../../ui/DropDownMenu";
import { PayPalButton } from "react-paypal-button-v2";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import defaultImg from "../../../assets/default.webp";

import axios from "axios";
import { getAddressCache } from "../../../apis/address";
import { socketId } from "../../..";
import { VNPay } from "vnpay";
import dateformat from "dateformat";

const IMG = process.env.REACT_APP_STATIC_URL;
const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

const apiEndpointFee =
  "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";

const apiEndpointAvailableServices =
  "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services";

const headers = {
  Token: "df39b10b-1767-11ef-bfe9-c2d25c6518ab",
  shop_id: "5080978",
};

const calculateShippingFee = async ({
  insuranceValue,
  fromDistrictId,
  fromWardCode,
  toDistrictId,
  toWardCode,
}) => {
  try {
    const res = await axios.post(
      apiEndpointAvailableServices,
      {
        shop_id: 5080978,
        from_district: fromDistrictId,
        to_district: toDistrictId,
      },
      { headers }
    );

    const serviceId = res.data.data?.[0].service_id ?? 100039;

    const response = await axios.post(
      apiEndpointFee,
      {
        service_id: serviceId,
        insurance_value: insuranceValue,
        coupon: null,
        from_district_id: fromDistrictId,
        from_ward_code: fromWardCode,
        to_district_id: toDistrictId,
        to_ward_code: toWardCode,
        height: 15,
        length: 15,
        weight: 1000,
        width: 15,
      },
      { headers }
    );
    return response.data.data.total;
  } catch (error) {
    console.error("Error calculating shipping fee:", error);
    return 0;
  }
};

const CheckoutForm = ({
  cartId = "",
  storeId = "",
  storeAddress = "",
  userId = "",
  items = {},
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState({});
  const [updateDispatch] = useUpdateDispatch();
  const history = useHistory();
  const {
    firstName,
    lastName,
    phone,
    addresses,
    level: userLevel,
  } = useSelector((state) => state.account.user);

  const init = async () => {
    try {
      setIsLoading(true);
      const res1 = await getStoreLevel(storeId);
      const res2 = await getCommissionByStore(storeId);
      const res3 = await getAddressCache(encodeURIComponent(storeAddress));
      const res4 = await getAddressCache(encodeURIComponent(order.address));

      const { totalPrice, totalSalePrice, amountFromUser1 } = totalProducts(
        items,
        userLevel
      );
      const { amountFromStore, amountToStore } = totalCommission(
        items,
        res1.level,
        res2.commission
      );

      const shippingFee = await calculateShippingFee({
        insuranceValue: totalPrice,
        fromDistrictId: res3.districtID ? Number(res3.districtID) : 1758,
        fromWardCode: res3.wardID ?? "510813",
        toDistrictId: res4.districtID ? Number(res4.districtID) : 3440,
        toWardCode: res4.wardID ?? "13010",
      });
      const { amountFromUser2 } = totalDelivery(shippingFee, userLevel);
      setOrder({
        firstName,
        lastName,
        phone: order.phone ?? phone,
        address: order.address ?? addresses[0],
        isValidFirstName: true,
        isValidLastName: true,
        isValidPhone: true,
        cartId,
        deliveryPrice: shippingFee,
        amountFromUser2,
        totalPrice,
        totalSalePrice,
        amountFromUser1,
        amountFromUser: amountFromUser1 + amountFromUser2,
        amountFromStore,
        amountToStore,
        commissionId: res2.commission._id,
        amountToZenpii: amountFromUser1 + amountFromUser2 - amountToStore,
      });
    } catch (e) {
      console.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [
    cartId,
    userId,
    storeId,
    items,
    firstName,
    lastName,
    phone,
    addresses,
    userLevel,
    order.address,
  ]);
  const [paypalDisabled, setPaypalDisabled] = useState(true);

  useEffect(() => {
    setPaypalDisabled(
      !order.firstName || !order.lastName || !order.phone || !order.address
    );
  }, [order.firstName, order.lastName, order.phone, order.address]);

  const handleChange = (name, isValidName, value) => {
    setOrder({
      ...order,
      [name]: value,
      [isValidName]: true,
    });
  };

  const handleValidate = (isValidName, flag) => {
    setOrder({
      ...order,
      [isValidName]: flag,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      cartId,
      firstName,
      lastName,
      phone,
      address,
      commissionId,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToZenpii,
    } = order;

    if (
      !cartId ||
      !commissionId ||
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !amountFromUser ||
      !amountFromStore ||
      !amountToStore ||
      !amountToZenpii
    ) {
      setOrder({
        ...order,
        isValidFirstName: regexTest("name", order.firstName),
        isValidLastName: regexTest("name", order.lastName),
        isValidPhone: regexTest("phone", order.phone),
      });
      return;
    }
    if (
      !order.isValidFirstName ||
      !order.isValidLastName ||
      !order.isValidPhone
    )
      return;
    setIsConfirming(true);
  };

  const onSubmit = () => {
    const { _id, accessToken } = getToken();
    const {
      firstName,
      lastName,
      phone,
      address,
      commissionId,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToZenpii,
    } = order;

    const orderBody = {
      firstName,
      lastName,
      phone,
      address,
      commissionId,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToZenpii,
      isPaidBefore: false,
    };

    setIsLoading(true);
    createOrder(_id, accessToken, cartId, orderBody)
      .then((data) => {
        if (data.error) toast.error(data.error);
        else {
          updateDispatch("account", data.user);
          socketId.emit("notificationOrder", {
            orderId: data.order._id,
            from: _id,
            to: storeId,
          });
          history.push("/account/purchase");
          toast.success(t("toastSuccess.order.create"));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Some thing went wrong");
        setIsLoading(false);
      });
  };

  const handlePayPalCreateOrder = (data, actions) => {
    const {
      cartId,
      commissionId,
      firstName,
      lastName,
      phone,
      address,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToZenpii,
    } = order;

    if (
      !cartId ||
      !commissionId ||
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !amountFromUser ||
      !amountFromStore ||
      !amountToStore ||
      !amountToZenpii
    ) {
      setOrder({
        ...order,
        isValidFirstName: regexTest("name", order.firstName),
        isValidLastName: regexTest("name", order.lastName),
        isValidPhone: regexTest("phone", order.phone),
      });
      return;
    }

    if (
      !order.isValidFirstName ||
      !order.isValidLastName ||
      !order.isValidPhone
    )
      return;
    else {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: convertVNDtoUSD(order.amountFromUser),
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      });
    }
  };
  const handlePayPalApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { _id, accessToken } = getToken();

      const {
        firstName,
        lastName,
        phone,
        address,
        commissionId,
        amountFromUser,
        amountFromStore,
        amountToStore,
        amountToZenpii,
      } = order;

      const orderBody = {
        firstName,
        lastName,
        phone,
        address,
        commissionId,
        amountFromUser,
        amountFromStore,
        amountToStore,
        amountToZenpii,
        isPaidBefore: true,
      };

      setIsLoading(true);
      createOrder(_id, accessToken, cartId, orderBody)
        .then((data) => {
          if (data.error) setError(data.error);
          else {
            updateDispatch("account", data.user);
            socketId.emit("notificationOrder", {
              orderId: data.order._id,
              from: _id,
              to: storeId,
            });
            history.push("/account/purchase");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setError(`Server Error: ${error}`);
          setIsLoading(false);
        });
    });
  };

  return (
    <div className="position-relative">
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t("orderDetail.cod")}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t("confirmDialog")}
        />
      )}
      <div className="container-fluid">
        <form className="rounded-1 row border" onSubmit={handleSubmit}>
          <div className="col-12 bg-primary rounded-top-1 p-2 px-3">
            <Logo navFor="user" width="130px" />
          </div>

          <div className="col-xl-7 col-md-6">
            <div className="row my-2 p-3 border bg-body rounded-1 ms-0">
              <span className="fw-semibold col-12 fs-12">
                {t("orderDetail.userReceiver")}
              </span>
              <hr className="my-2" />
              <div className="col-6 d-flex justify-content-between align-items-end">
                <div className="flex-grow-1">
                  <Input
                    type="text"
                    label={t("userDetail.firstName")}
                    value={order.firstName}
                    isValid={order.isValidFirstName}
                    feedback={t("userDetail.validFirstName")}
                    validator="name"
                    required={true}
                    onChange={(value) =>
                      handleChange("firstName", "isValidFirstName", value)
                    }
                    onValidate={(flag) =>
                      handleValidate("isValidFirstName", flag)
                    }
                  />
                </div>
              </div>
              <div className="col-6 d-flex justify-content-between align-items-end">
                <div className="flex-grow-1">
                  <Input
                    type="text"
                    label={t("userDetail.lastName")}
                    ZX
                    value={order.lastName}
                    isValid={order.isValidLastName}
                    feedback={t("userDetail.validLastName")}
                    validator="name"
                    required={true}
                    onChange={(value) =>
                      handleChange("lastName", "isValidLastName", value)
                    }
                    onValidate={(flag) =>
                      handleValidate("isValidLastName", flag)
                    }
                  />
                </div>

                <div className="d-inline-block position-relative ms-4">
                  <div className="d-inline-block cus-tooltip">
                    <button
                      className="btn btn-primary ripple rounded-1"
                      type="button"
                      disabled={!!!firstName || !!!lastName}
                      onClick={() =>
                        setOrder({
                          ...order,
                          firstName: firstName,
                          lastName: lastName,
                          isValidFirstName: true,
                          isValidLastName: true,
                        })
                      }>
                      <i className="fa-light fa-user-large"></i>
                    </button>
                  </div>
                  <small className="cus-tooltip-msg">
                    {t("orderDetail.useRegisterLastName")}
                  </small>
                </div>
              </div>
              <div className="col-12 mt-2 d-flex justify-content-between align-items-end">
                <div className="flex-grow-1">
                  <Input
                    type="text"
                    label={t("userDetail.phone")}
                    value={order.phone}
                    isValid={order.isValidPhone}
                    feedback={t("userDetail.phoneValid")}
                    validator="phone"
                    required={true}
                    onChange={(value) =>
                      handleChange("phone", "isValidPhone", value)
                    }
                    onValidate={(flag) => handleValidate("isValidPhone", flag)}
                  />
                </div>

                <div className="d-inline-block position-relative ms-4">
                  <div className="d-inline-block cus-tooltip">
                    <button
                      className="btn btn-primary ripple rounded-1"
                      type="button"
                      disabled={!!!phone}
                      onClick={() =>
                        setOrder({
                          ...order,
                          phone: phone,
                          isValidPhone: true,
                        })
                      }>
                      <i className="fa-light fa-phone"></i>
                    </button>
                  </div>
                  <small className="cus-tooltip-msg">
                    {t("orderDetail.useRegisterPhone")}
                  </small>
                </div>
              </div>

              <div className="col-12 mt-2 d-flex justify-content-between align-items-end">
                <div className="flex-grow-1">
                  <DropDownMenu
                    borderBtn={false}
                    required={true}
                    listItem={addresses?.map((a, i) => {
                      const newA = {
                        value: a,
                        label: a,
                      };
                      return newA;
                    })}
                    value={order.address}
                    setValue={(address) => {
                      setOrder({
                        ...order,
                        address: address,
                      });
                    }}
                    size="lg"
                    label={t("userDetail.address")}
                  />

                  {addresses?.length <= 0 && (
                    <small
                      style={{
                        marginTop: "-20px",
                        display: "block",
                      }}>
                      <Error msg="No address to choose, please add your address first!" />
                    </small>
                  )}
                </div>
                <div className="mb-2 ms-4 position-relative">
                  <div className="d-inline-block cus-tooltip">
                    <UserAddAddressItem
                      count={addresses?.length}
                      detail={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='row my-2 p-3 border bg-body rounded-1 ms-0'>
              <span
                style={{ fontSize: '1.2rem' }}
                className='fw-semibold col-12'
              >
                {t('orderDetail.deliveryUnit')}
              </span>
              <hr className='my-2' />
              <div className='col-12 mt-2 d-flex justify-content-between align-items-end'>
                {deliveries?.length > 0 && (
                  <DropDownMenu
                    borderBtn={false}
                    listItem={deliveries?.map((d, i) => {
                      const newD = {
                        value: d,
                        label:
                          d.name +
                          ' (' +
                          formatPrice(d.price.$numberDecimal) +
                          '₫) - ' +
                          d.description
                      }
                      return newD
                    })}
                    required={true}
                    value={order.delivery}
                    setValue={(delivery) => {
                      const { deliveryPrice, amountFromUser2 } = totalDelivery(
                        delivery,
                        userLevel
                      )
                      setOrder({
                        ...order,
                        delivery,
                        deliveryId: delivery._id,
                        deliveryPrice,
                        amountFromUser2,
                        amountFromUser: order.amountFromUser1 + amountFromUser2,
                        amountToZenpii:
                          order.amountFromUser1 +
                          amountFromUser2 -
                          order.amountToStore
                      })
                    }}
                    size='lg'
                    label={t('deliveryDetail.deliveryUnit')}
                  />
                )}
                <div className='d-inline-block position-relative ms-4 mb-2'>
                  <div className='d-inline-block'>
                    <span className='btn btn-primary default rounded-1'>
                      <i className='fa-light fa-truck'></i>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="col-xl-5 col-md-6">
            <div className="my-2 p-3 border bg-body rounded-1">
              <span
                style={{ fontSize: "1.2rem" }}
                className="fw-semibold px-2 col-12">
                {t("cartDetail.yourOrder")}
              </span>
              <hr className="my-2" />
              <dl className="row px-2">
                {items.map((item) => (
                  <>
                    <dt className="col-8 text-secondary fw-normal d-flex align-items-start gap-1 mb-1">
                      <img
                        src={IMG + item.productId?.listImages[0] ?? defaultImg}
                        alt=""
                        className="rounded-2 border w-20"
                      />
                      <small className="product-name">
                        {item.productId?.name}
                      </small>
                      <span className="text-nowrap">x {item.count}</span>
                    </dt>
                    <dd className="col-4">
                      <dl className="row">
                        <dd className="col-12 text-end">
                          <span className="fs-6">
                            {formatPrice(
                              item.productId?.salePrice?.$numberDecimal *
                                item.count
                            )}
                            <sup>₫</sup>
                          </span>
                        </dd>
                      </dl>
                    </dd>
                  </>
                ))}

                <dt className="col-7 text-secondary fw-normal">
                  {t("cartDetail.subTotal")}
                </dt>
                <dd className="col-5">
                  <dl className="row">
                    <dd className="col-12 text-end">
                      <span className="fs-6">
                        {formatPrice(order.totalSalePrice ?? 0)}
                        <sup>₫</sup>
                      </span>
                    </dd>
                  </dl>
                </dd>
                {order.totalSalePrice - order.amountFromUser1 > 0 && (
                  <dt className="col-7 text-secondary fw-normal">
                    {t("cartDetail.zenpiiVoucherApplied")}
                  </dt>
                )}
                {order.totalSalePrice - order.amountFromUser1 > 0 && (
                  <dd className="col-5">
                    <dl className="row">
                      <dd className="col-12 text-end">
                        <span className="fs-6">
                          -{" "}
                          {formatPrice(
                            order.totalSalePrice - order.amountFromUser1 ?? 0
                          )}
                          <sup>₫</sup>
                        </span>
                      </dd>
                    </dl>
                  </dd>
                )}
                <dt className="col-7 text-secondary fw-normal">
                  {t("cartDetail.shippingFee")}
                </dt>
                <dd className="col-5">
                  <dl className="row">
                    <dd className="col-12 text-end">
                      <span className="fs-6">
                        {formatPrice(order.deliveryPrice ?? 0)}
                        <sup>₫</sup>
                      </span>
                    </dd>
                  </dl>
                </dd>
                {order.deliveryPrice - order.amountFromUser2 > 0 && (
                  <dt className="col-7 text-secondary fw-normal">
                    {t("cartDetail.discountShippingFee")}
                  </dt>
                )}
                {order.deliveryPrice - order.amountFromUser2 > 0 && (
                  <dd className="col-5">
                    <dl className="row">
                      <dd className="col-12 text-end">
                        <span className="fs-6">
                          -{" "}
                          {formatPrice(
                            order.deliveryPrice - order.amountFromUser2 ?? 0
                          )}
                          <sup>₫</sup>
                        </span>
                      </dd>
                    </dl>
                  </dd>
                )}

                <dt className="col-7 text-secondary fw-normal">
                  {t("cartDetail.total")}
                </dt>
                <dd className="col-5">
                  <dl className="row">
                    <span className="col-12 text-primary fw-bold fs-6 text-end">
                      {formatPrice(order.amountFromUser ?? 0)}
                      <sup>₫</sup>
                    </span>
                  </dl>
                </dd>
              </dl>

              {error && (
                <div className="my-1">
                  <Error msg={error} />
                </div>
              )}

              <div className="mt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg ripple w-100 mb-1"
                  onClick={handleSubmit}
                  disabled={!order.address || !order.phone}>
                  {t("orderDetail.cod")}
                </button>

                <div style={{ position: "relative", zIndex: "1" }}>
                  <PayPalButton
                    options={{
                      clientId: CLIENT_ID,
                    }}
                    style={{
                      layout: "horizontal",
                      tagline: "false",
                    }}
                    createOrder={(data, actions) =>
                      handlePayPalCreateOrder(data, actions)
                    }
                    onApprove={(data, actions) =>
                      handlePayPalApprove(data, actions)
                    }
                    onError={(err) => setError(String(err).slice(0, 300))}
                    onCancel={() => setIsLoading(false)}
                    disabled={paypalDisabled}
                  />
                </div>

                <div style={{ position: "relative", zIndex: "1" }}>
                  <button
                    type="button"
                    className="btn btn-default hover:bg-blue-100 border-solid border border-blue-700 border-2 btn-lg ripple w-100 mb-1 p-0"
                    disabled={!order.address || !order.phone}
                    onClick={async () => {
                      const {
                        cartId,
                        commissionId,
                        firstName,
                        lastName,
                        phone,
                        address,
                        amountFromUser,
                        amountFromStore,
                        amountToStore,
                        amountToZenpii,
                      } = order;

                      const vnpay = new VNPay({
                        tmnCode: "M81536UR",
                        secureSecret: "EU2OYS5JSUY59EUS9TSMOV1U9PI4L466",
                        vnpayHost: "https://sandbox.vnpayment.vn",
                        testMode: true, // optional
                        hashAlgorithm: "SHA512", // optional
                      });
                      const date = new Date();
                      const tnx = dateformat(date, "HHmmss"); // Generate your own transaction code
                      const urlString = vnpay.buildPaymentUrl({
                        vnp_Amount: order.amountFromUser,
                        vnp_IpAddr: "192.168.0.1",
                        vnp_ReturnUrl: `http://localhost:3000/cart?isOrder=true&cartId=${cartId}&storeId=${storeId}`,
                        vnp_TxnRef: tnx,
                        vnp_OrderInfo: `Thanh toan cho ma GD: ${tnx}`,
                      });

                      const orderBody = {
                        firstName,
                        lastName,
                        phone,
                        address,
                        commissionId,
                        amountFromUser,
                        amountFromStore,
                        amountToStore,
                        amountToZenpii,
                        isPaidBefore: true,
                      };

                      localStorage.setItem("order", JSON.stringify(orderBody));
                      console.log(urlString);
                      window.location.href = urlString;
                    }}>
                    <img
                      src={vnpayImage}
                      alt="vn pay"
                      width={100}
                      height={50}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
