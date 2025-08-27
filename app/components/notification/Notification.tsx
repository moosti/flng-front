import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Icon from "../base/Icon";
import moment from "jalali-moment";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FetcherClientSide } from "@/app/utils/FetcherClientSide";
import _ from "lodash";
import ButtonAnimated from "../buttons/ButtonAnimated";

// interface NotificationProps {
//   notifications: NotificationItem[];
//   onRead?: (id: string) => void;
// }

interface NotificationItem {
  id: number;
  notif_type: string;
  created_at: string;
}

const Notification = () => {
  const t = useTranslations("level");
  const [isOpen, setIsOpen] = useState(false);
  const [notificationData, setNotificationData] = useState<NotificationItem[]>(
    []
  );

  const fetchNotification = async () => {
    const { data, status } = await FetcherClientSide<NotificationItem[]>({
      url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/notification/my-notifications/`,
      method: "GET",
    });

    if (status === 200 && data) {
      setNotificationData(data);
    } else if (status === 404) {
      setNotificationData([]);
    }
  };

  const readNotification = async (notification_id: number) => {
    const { status } = await FetcherClientSide<NotificationItem[]>({
      url: `${process.env.NEXT_PUBLIC_LOCAL_URL_FOR_TETS}/notification/read/${notification_id}/`,
      method: "PATCH",
    });

    if (status === 204) {
      setNotificationData((prev) =>
        _.filter(prev, (item) => item.id !== notification_id)
      );
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".notification-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative notification-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-base-hover transition-colors cursor-pointer outline-none"
      >
        {notificationData.length > 0 ? (
          <Image
            width={25}
            height={25}
            alt="notification"
            src="/svg/home/topNav/notification.svg"
          />
        ) : (
          <Image
            width={25}
            height={25}
            alt="notification_disabled"
            src="/svg/home/topNav/notification_disabled.svg"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            className="fixed md:absolute top-0 md:top-auto start-0 end-0 md:start-auto md:end-0 w-full md:w-80 bg-base-card shadow-2xl border-2 border-disable/20 rounded-xl overflow-hidden z-50 p-4 m-0 md:m-2"
          >
            <div className="flex justify-between items-center border-base-border mb-5">
              <h3 className="text-lg font-semibold">{t("my_notifications")}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden p-2 hover:bg-base-hover rounded-full cursor-pointer"
              >
                <Icon
                  name="close"
                  size="sm"
                  className="text-base-card-content/70"
                />
              </button>
            </div>

            <div className="max-h-[50vh] md:max-h-96 overflow-y-auto scrollbar-hidden">
              {notificationData.length > 0 ? (
                <motion.ul>
                  {notificationData.map((notification, index) => (
                    <motion.li
                      key={notification.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-t border-disable/20  px-2 py-5 transition-colors hover:bg-disable/20 duration-400`}
                      //   onClick={() => onRead?.(notification.id)}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                        <h4 className="font-medium text-sm break-words w-full md:w-2/3">
                          {t(`${notification.notif_type}`)}
                        </h4>
                        <div
                          dir="ltr"
                          className="flex justify-start md:justify-center items-center gap-2 text-base-content/60 w-full md:w-auto  mt-0.5"
                        >
                          <p className="text-xs whitespace-nowrap">
                            {moment(notification.created_at, "YYYY/MM/DD HH:mm")
                              .locale("fa")
                              .format("YYYY/MM/DD")}
                          </p>
                          <p className="text-xs whitespace-nowrap">
                            {moment(notification.created_at, "YYYY/MM/DD HH:mm")
                              .locale("fa")
                              .format("HH:mm")}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-base-content/80 mt-1 break-words text-justify opacity-70">
                        {t(`${notification.notif_type}_des`)}
                      </p>
                      <div className="h-13 mt-5 w-fit ms-auto">
                        <ButtonAnimated
                          onClick={async () => {
                            await readNotification(notification.id);
                          }}
                          color="disable"
                          className="!h-12 !w-12 !min-w-12 p-1 relative !rounded-lg"
                        >
                          <Image
                            width={20}
                            height={20}
                            alt="notification_disabled"
                            src="/svg/home/topNav/seen.svg"
                            className=""
                          />
                          {/* <p className="text-sm">{t("seen")}</p> */}
                        </ButtonAnimated>
                      </div>

                      {/* <button className="mt-5 bg-green-200 p-2 rounded-full w-fit ms-auto flex justify-end items-center cursor-pointer">
                        <Image
                          width={15}
                          height={15}
                          alt="notification_disabled"
                          src="/svg/home/topNav/seen.svg"
                          className=""
                        />
                      </button> */}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <h4 className="p-4 text-center border-t border-disable/20 text-base-content/60">
                  {t("there_is_no_notifications")}
                </h4>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
