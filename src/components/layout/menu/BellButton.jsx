import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { deleteNotifications, getNotifications, updateRead } from "../../../apis/notification";
import { socketId } from "../../..";
import { useSelector } from "react-redux";

const BellButton = () => {
  const [list, setList] = useState([

  ]);

  const user = useSelector((state) => state.account.user);

  const [cartCount, setCartCount] = useState(list.length);

  const handleDelete = async () => {
    try {
      await deleteNotifications(user._id)
      setList([]);
    } catch (error) {
      console.log(error)
    }
  };

  const handleClick = async () => {
    try {
      await updateRead(user._id)
      setCartCount(0);
    } catch (error) {
      console.log(error)
    }
  };

  const fetchNotifications = async (id) => {
    try {
      const res = await getNotifications(id);
      setList(res.notifications)
      setCartCount(res.numberHidden);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchNotifications(user._id);
  }, [user]);

  useEffect(() => {
    socketId.on("notification", (id) => {
      fetchNotifications(id)
    });
  }, []);

  const popoverClickRootClose = (
    <Popover
      id="popover-trigger-click-root-close"
      title="Popover bottom"
      style={{
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "5px",
        minWidth: "350px",
      }}
    >
      <div
        style={{
          height: "300px",
          overflow: "auto",
        }}
      >
        {list.map((l) => (
          <p
            key={l._id}
            style={{
              padding: "15px 20px",
              margin: "5px 0px",
              background: "#f7f7f7",
            }}
          >
            {l.message}
          </p>
        ))}
        {list.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "60px", paddingTop: "120px" }}>
            No notifications
          </p>
        )}
      </div>
      {list.length !== 0 && (
        <>
          <hr
            style={{
              border: 0,
              borderTop: "1px solid black",
              margin: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "10px 20px",
            }}
          >
            <Button size="sm" onClick={handleDelete}>
              Delete all
            </Button>
          </div>
        </>
      )}
    </Popover>
  );

  return (
    <li className="nav-item" onClick={handleClick}>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom"
        overlay={popoverClickRootClose}
      >
        <div className="cart-item-wrap position-relative">
          <span className="rounded-circle btn lang inherit">
            <i className="fa-light fa-bell"></i>
          </span>
          {cartCount > 0 && (
            <span
              style={{ top: "20%", left: "80%" }}
              className="position-absolute translate-middle badge rounded-pill bg-danger"
            >
              {cartCount < 100 ? cartCount : "99+"}
            </span>
          )}
        </div>
      </OverlayTrigger>
    </li>
  );
};

export default BellButton;
