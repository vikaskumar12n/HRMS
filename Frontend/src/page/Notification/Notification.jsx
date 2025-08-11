import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  CheckCircle, 
  Circle, 
  X, 
  AlertCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { 
  useDeleteNotificationMutation, 
  useGetNotificationQuery, 
  useMarkAsReadNotificationMutation 
} from '../../rtk/notification';
import { data, Link } from 'react-router-dom';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // RTK hooks
  const { data: apiData, isLoading, error } = useGetNotificationQuery();
  const [markAsReadMutation] = useMarkAsReadNotificationMutation();
  const [deleteNotificationMutation] = useDeleteNotificationMutation();


  

  


  useEffect(() => {
    if (apiData && Array.isArray(apiData)) {
      const processed = apiData.map((item) => ({
        _id: item._id,
        id: item._id,
        title: item.title || 'Notification',
        message: item.message || 'No message available',
        isRead: item.isRead || false,
        timestamp: item.createdAt || new Date().toISOString(),
        type: getNotificationType(item.title),
        url:item?.url 
      }));
      setNotifications(processed);
    }
  }, [apiData]);

  const getNotificationType = (title) => {
    if (!title) return 'info';
    const lower = title.toLowerCase();
    if (lower.includes('approved') || lower.includes('success')) return 'success';
    if (lower.includes('reminder') || lower.includes('pending')) return 'warning';
    if (lower.includes('error') || lower.includes('failed') || lower.includes('required')) return 'error';
    return 'info';
  };

  const markAsReadAPI = async (notificationIds) => {
    try {
      const ids = Array.isArray(notificationIds) ? notificationIds : [notificationIds];
      for (const id of ids) {
        await markAsReadMutation({ id }).unwrap();
      }
      return true;
    } catch (error) {
      console.error('Error marking as read:', error);
      return false;
    }
  };

  const deleteNotificationsAPI = async (notificationIds) => {
    try {
      const ids = Array.isArray(notificationIds) ? notificationIds : [notificationIds];
      for (const id of ids) {
        await deleteNotificationMutation({ id }).unwrap();
      }
      return true;
    } catch (error) {
      console.error('Error deleting notifications:', error);
      return false;
    }
  };

  const clearAllNotificationsAPI = async () => {
    try {
      const allIds = notifications.map(n => n._id);
      for (const id of allIds) {
        await deleteNotificationMutation({ id }).unwrap();
      }
      return true;
    } catch (error) {
      console.error('Error clearing all notifications:', error);
      return false;
    }
  };

  const handleNotificationSelect = (id) => {
    setSelectedNotifications(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map(n => n._id));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    setSelectAll(
      selectedNotifications.length === notifications.length && notifications.length > 0
    );
  }, [selectedNotifications, notifications]);

  const handleMarkAsRead = async (id) => {
    setActionLoading(true);
    const success = await markAsReadAPI(id);
    if (success) {
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      );
    }
    setActionLoading(false);
  };

  const handleMarkSelectedAsRead = async () => {
    if (selectedNotifications.length === 0) return;
    setActionLoading(true);
    const success = await markAsReadAPI(selectedNotifications);
    if (success) {
      setNotifications(prev =>
        prev.map(n =>
          selectedNotifications.includes(n._id) ? { ...n, isRead: true } : n
        )
      );
      setSelectedNotifications([]);
    }
    setActionLoading(false);
  };

  const handleDeleteSelected = async () => {
    if (selectedNotifications.length === 0) return;
    setActionLoading(true);
    const success = await deleteNotificationsAPI(selectedNotifications);
    if (success) {
      setNotifications(prev =>
        prev.filter(n => !selectedNotifications.includes(n._id))
      );
      setSelectedNotifications([]);
    }
    setActionLoading(false);
  };

  const handleClearAll = async () => {
    setActionLoading(true);
    const success = await clearAllNotificationsAPI();
    if (success) {
      setNotifications([]);
      setSelectedNotifications([]);
    }
    setActionLoading(false);
  };

  const getNotificationTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-[#06425F]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Notifications</h3>
          <p className="text-gray-600">Unable to fetch notifications. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#06425F] p-2 rounded-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-600">
                {notifications.filter(n => !n.isRead).length} unread of {notifications.length} total
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedNotifications.length > 0 && (
              <>
                <button
                  onClick={handleMarkSelectedAsRead}
                  disabled={actionLoading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  Mark Read ({selectedNotifications.length})
                </button>
                <button
                  onClick={handleDeleteSelected}
                  disabled={actionLoading}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Delete ({selectedNotifications.length})
                </button>
              </>
            )}

            <button
              onClick={handleClearAll}
              disabled={actionLoading || notifications.length === 0}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Clear All
            </button>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              {selectAll ? 
                <CheckCircle className="h-4 w-4 text-[#06425F]" /> : 
                <Circle className="h-4 w-4" />
              }
              {selectAll ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {notifications.length === 0 ? (
          <div className="bg-white col-span-2 rounded-lg border border-gray-100 p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! No new notifications at this time.</p>
          </div>
        ) : (
          notifications.map((notification) => (
             <Link to={`/dashboard/${notification?.url}`}>
            <div
              key={notification.id}
              className={`bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
                notification.isRead ? 'border-gray-100' : 'border-l-[#06425F] border-l-4 border-gray-100'
              } ${selectedNotifications.includes(notification.id) ? 'ring-2 ring-[#06425F] ring-opacity-20' : ''}`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleNotificationSelect(notification.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {selectedNotifications.includes(notification.id) ? 
                      <CheckCircle className="h-5 w-5 text-[#06425F]" /> : 
                      <Circle className="h-5 w-5 text-gray-400 hover:text-[#06425F]" />
                    }
                  </button>

                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className={`font-medium ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        <p className={`mt-1 text-sm ${notification.isRead ? 'text-gray-500' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getNotificationTypeStyles(notification.type)}`}>
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          disabled={actionLoading}
                          className="flex items-center gap-1 text-xs text-[#06425F] hover:text-[#083d56] font-medium transition-colors disabled:opacity-50"
                        >
                          <Check className="h-3 w-3" />
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
