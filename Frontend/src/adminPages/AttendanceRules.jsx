import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Clock, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Settings,
  Users,
  Timer,
  MapPin,
  Shield,
  Coffee,
  Moon,
  Sun,
  Zap
} from 'lucide-react';

const AttendanceRules = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'timing',
    shiftType: 'day',
    checkInTime: '',
    checkOutTime: '',
    graceTime: '',
    lateMarkAfter: '',
    halfDayHours: '',
    fullDayHours: '',
    overtimeAfter: '',
    weeklyOff: 'sunday',
    breakDuration: '',
    locationRequired: false,
    biometricRequired: false,
    description: ''
  });

  const [attendanceRules, setAttendanceRules] = useState([
    {
      id: 1,
      name: 'Day Shift - General',
      category: 'timing',
      shiftType: 'day',
      checkInTime: '09:00',
      checkOutTime: '18:00',
      graceTime: 15,
      lateMarkAfter: 15,
      halfDayHours: 4,
      fullDayHours: 8,
      overtimeAfter: 8,
      weeklyOff: 'sunday',
      breakDuration: 60,
      locationRequired: true,
      biometricRequired: true,
      description: 'Standard day shift timing for all departments'
    },
    {
      id: 2,
      name: 'Night Shift - IT',
      category: 'timing',
      shiftType: 'night',
      checkInTime: '22:00',
      checkOutTime: '06:00',
      graceTime: 30,
      lateMarkAfter: 30,
      halfDayHours: 4,
      fullDayHours: 8,
      overtimeAfter: 8,
      weeklyOff: 'sunday',
      breakDuration: 90,
      locationRequired: false,
      biometricRequired: true,
      description: 'Night shift for IT support team'
    },
    {
      id: 3,
      name: 'Flexible Hours - Senior',
      category: 'timing',
      shiftType: 'flexible',
      checkInTime: '08:00',
      checkOutTime: '17:00',
      graceTime: 60,
      lateMarkAfter: 60,
      halfDayHours: 4,
      fullDayHours: 8,
      overtimeAfter: 9,
      weeklyOff: 'saturday',
      breakDuration: 45,
      locationRequired: false,
      biometricRequired: false,
      description: 'Flexible timing for senior employees'
    },
    {
      id: 4,
      name: 'Late Mark Policy',
      category: 'penalty',
      shiftType: 'day',
      checkInTime: '09:00',
      checkOutTime: '18:00',
      graceTime: 10,
      lateMarkAfter: 10,
      halfDayHours: 4,
      fullDayHours: 8,
      overtimeAfter: 8,
      weeklyOff: 'sunday',
      breakDuration: 60,
      locationRequired: true,
      biometricRequired: true,
      description: '3 late marks = 1 day salary deduction'
    },
    {
      id: 5,
      name: 'Overtime Policy',
      category: 'overtime',
      shiftType: 'day',
      checkInTime: '09:00',
      checkOutTime: '18:00',
      graceTime: 15,
      lateMarkAfter: 15,
      halfDayHours: 4,
      fullDayHours: 8,
      overtimeAfter: 8,
      weeklyOff: 'sunday',
      breakDuration: 60,
      locationRequired: true,
      biometricRequired: true,
      description: 'Overtime calculation and approval rules'
    }
  ]);

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'timing',
      shiftType: 'day',
      checkInTime: '',
      checkOutTime: '',
      graceTime: '',
      lateMarkAfter: '',
      halfDayHours: '',
      fullDayHours: '',
      overtimeAfter: '',
      weeklyOff: 'sunday',
      breakDuration: '',
      locationRequired: false,
      biometricRequired: false,
      description: ''
    });
    setEditingRule(null);
    setShowAddForm(false);
  };

  const handleEdit = (rule) => {
    setFormData(rule);
    setEditingRule(rule.id);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (editingRule) {
      setAttendanceRules(prev => 
        prev.map(rule => 
          rule.id === editingRule ? { ...formData, id: editingRule } : rule
        )
      );
    } else {
      setAttendanceRules(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    setAttendanceRules(prev => prev.filter(rule => rule.id !== id));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'timing': return <Clock className="w-5 h-5" />;
      case 'penalty': return <AlertTriangle className="w-5 h-5" />;
      case 'overtime': return <Zap className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'timing': return 'bg-blue-100 text-blue-700';
      case 'penalty': return 'bg-red-100 text-red-700';
      case 'overtime': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getShiftIcon = (shiftType) => {
    switch (shiftType) {
      case 'day': return <Sun className="w-4 h-4" />;
      case 'night': return <Moon className="w-4 h-4" />;
      case 'flexible': return <Timer className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
          <div className="p-4 border-b border-gray-200" style={{ backgroundColor: '#06425F' }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-white" />
                <h1 className="text-xl font-bold text-white">Attendance Rules Management</h1>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-white text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Rule
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="p-4 border-b border-gray-200" style={{ backgroundColor: '#06425F' }}>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Settings className="w-4 h-4" />
                {editingRule ? 'Edit Attendance Rule' : 'Add New Attendance Rule'}
              </h2>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Day Shift - General"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="timing">Timing Rules</option>
                    <option value="penalty">Penalty Rules</option>
                    <option value="overtime">Overtime Rules</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift Type</label>
                  <select
                    value={formData.shiftType}
                    onChange={(e) => setFormData({...formData, shiftType: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="day">Day Shift</option>
                    <option value="night">Night Shift</option>
                    <option value="flexible">Flexible Hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Off</label>
                  <select
                    value={formData.weeklyOff}
                    onChange={(e) => setFormData({...formData, weeklyOff: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="sunday">Sunday</option>
                    <option value="saturday">Saturday</option>
                    <option value="monday">Monday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time</label>
                  <input
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) => setFormData({...formData, checkInTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
                  <input
                    type="time"
                    value={formData.checkOutTime}
                    onChange={(e) => setFormData({...formData, checkOutTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grace Time (Minutes)</label>
                  <input
                    type="number"
                    value={formData.graceTime}
                    onChange={(e) => setFormData({...formData, graceTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Late Mark After (Minutes)</label>
                  <input
                    type="number"
                    value={formData.lateMarkAfter}
                    onChange={(e) => setFormData({...formData, lateMarkAfter: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Half Day Hours</label>
                  <input
                    type="number"
                    value={formData.halfDayHours}
                    onChange={(e) => setFormData({...formData, halfDayHours: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Day Hours</label>
                  <input
                    type="number"
                    value={formData.fullDayHours}
                    onChange={(e) => setFormData({...formData, fullDayHours: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="8"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overtime After (Hours)</label>
                  <input
                    type="number"
                    value={formData.overtimeAfter}
                    onChange={(e) => setFormData({...formData, overtimeAfter: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="8"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Break Duration (Minutes)</label>
                  <input
                    type="number"
                    value={formData.breakDuration}
                    onChange={(e) => setFormData({...formData, breakDuration: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="locationRequired"
                    checked={formData.locationRequired}
                    onChange={(e) => setFormData({...formData, locationRequired: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="locationRequired" className="text-sm text-gray-700">Location Required</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="biometricRequired"
                    checked={formData.biometricRequired}
                    onChange={(e) => setFormData({...formData, biometricRequired: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="biometricRequired" className="text-sm text-gray-700">Biometric Required</label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Detailed description of attendance rule..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors flex items-center gap-2 text-sm"
                  style={{ backgroundColor: '#06425F' }}
                >
                  <Save className="w-4 h-4" />
                  Save Rule
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rules List */}
        <div className="grid gap-4">
          {attendanceRules.map((rule) => (
            <div key={rule.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#06425F' }}>
                      {getCategoryIcon(rule.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(rule.category)}`}>
                          {rule.category.charAt(0).toUpperCase() + rule.category.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      {getShiftIcon(rule.shiftType)}
                      {rule.shiftType.charAt(0).toUpperCase() + rule.shiftType.slice(1)} Shift
                    </div>
                    <button
                      onClick={() => handleEdit(rule)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      Timing
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {rule.checkInTime} - {rule.checkOutTime}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Shield className="w-4 h-4" />
                      Grace Time
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.graceTime} min</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      Late Mark After
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.lateMarkAfter} min</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Coffee className="w-4 h-4" />
                      Break Duration
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.breakDuration} min</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Timer className="w-4 h-4" />
                      Half Day
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.halfDayHours} hrs</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      Full Day
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.fullDayHours} hrs</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Zap className="w-4 h-4" />
                      Overtime After
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.overtimeAfter} hrs</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      Weekly Off
                    </div>
                    <div className="text-lg font-semibold text-gray-900 capitalize">{rule.weeklyOff}</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    {rule.locationRequired ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">Location Required</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {rule.biometricRequired ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">Biometric Required</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceRules;