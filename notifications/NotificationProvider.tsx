import { createContext, useContext, ReactNode, useCallback } from 'react';
import { store } from 'react-notifications-component';

type NotificationType = 'success' | 'danger' | 'info' | 'default' | 'warning';

interface NotificationContextValue {
  sendNotification: (
    title: string,
    message: string,
    type?: NotificationType
  ) => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendNotification: () => {},
});

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const sendNotification = useCallback(
    (title: string, message: string, type: NotificationType = 'default') => {
      store.addNotification({
        title,
        message,
        type,
        insert: 'top',
        container: 'bottom-left',
        animationIn: ['animate__animated animate__fadeIn'],
        animationOut: ['animate__animated animate__fadeOut'],
        dismiss: {
          duration: 5000,
        },
      });
    },
    []
  );

  return (
    <NotificationContext.Provider
      value={{
        sendNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotifications = () => useContext(NotificationContext);

export { NotificationProvider, useNotifications };
