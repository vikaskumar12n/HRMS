import React, { useRef, useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import {
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useGetAllAnnouncementsQuery,
  useUpdateAnnouncementMutation,
} from '../../rtk/announcementApi';

const Announcement = () => {
  const topRef = useRef(null); // ✅ Add ref

  const { data: announcements, isLoading } = useGetAllAnnouncementsQuery();
  const [addAnnouncement, { isLoading: isAdding }] = useAddAnnouncementMutation();
  const [updateAnnouncement, { isLoading: isUpdating }] = useUpdateAnnouncementMutation();
  const [deleteAnnouncement, { isLoading: isDeleting }] = useDeleteAnnouncementMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'medium',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAnnouncement({ id: editingId, data: formData }).unwrap();
        setEditingId(null);
      } else {
        await addAnnouncement(formData).unwrap();
      }
      setFormData({ title: '', message: '', priority: 'medium' });
      setShowForm(false);
    } catch (error) {
      alert(error?.message || 'Something went wrong');
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title || '',
      message: announcement.message || '',
      priority: announcement.priority || 'medium',
    });
    setEditingId(announcement._id);
    setShowForm(true);

    // ✅ Scroll to top reliably
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await deleteAnnouncement({ id }).unwrap();
      } catch (error) {
        alert(error?.message || 'Failed to delete announcement');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', message: '', priority: 'medium' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={32} color="#06425F" />
      </div>
    );
  }

  return (
    <div ref={topRef} className="max-w-6xl mx-auto p-6"> {/* ✅ Attach ref here */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-[#06425F] text-white px-4 py-2 rounded-md hover:bg-[#04364b] transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Announcement
        </button>
      </div>

      {showForm && (
        <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Announcement' : 'Add New Announcement'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06425F]"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isAdding || isUpdating}
                className="flex items-center bg-[#06425F] text-white px-4 py-2 rounded-md hover:bg-[#04364b] transition disabled:opacity-50"
              >
                {(isAdding || isUpdating) ? (
                  <ClipLoader size={16} color="white" className="mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full border`}>
                      {announcement.message?.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    {announcement.createdAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(announcement.createdAt)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-md transition"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    disabled={isDeleting}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition disabled:opacity-50"
                    title="Delete"
                  >
                    {isDeleting ? (
                      <ClipLoader size={16} color="#dc2626" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className={`text-gray-700 ${viewingId === announcement.id ? '' : 'line-clamp-2'}`}>
                {announcement.content}
              </div>

              {viewingId === announcement.id && announcement.content && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Full Content:</span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{announcement.content}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No announcements found</p>
            <p className="text-gray-400 text-sm">Create your first announcement to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
