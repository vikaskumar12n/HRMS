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
  FileText,
  Users,
  DollarSign
} from 'lucide-react';

const LeaveRules = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'paid',
    maxDaysPerYear: '',
    maxConsecutiveDays: '',
    minNotice: '',
    carryForward: false,
    maxCarryForward: '',
    probationEligible: false,
    documentRequired: false,
    description: ''
  });

  const [leaveRules, setLeaveRules] = useState([
    {
      id: 1,
      name: 'Annual Leave',
      type: 'paid',
      maxDaysPerYear: 21,
      maxConsecutiveDays: 15,
      minNotice: 7,
      carryForward: true,
      maxCarryForward: 5,
      probationEligible: false,
      documentRequired: false,
      description: 'Yearly vacation leave for all permanent employees'
    },
    {
      id: 2,
      name: 'Sick Leave',
      type: 'paid',
      maxDaysPerYear: 12,
      maxConsecutiveDays: 7,
      minNotice: 0,
      carryForward: false,
      maxCarryForward: 0,
      probationEligible: true,
      documentRequired: true,
      description: 'Medical leave with doctor certificate required for more than 2 days'
    },
    {
      id: 3,
      name: 'Casual Leave',
      type: 'paid',
      maxDaysPerYear: 8,
      maxConsecutiveDays: 3,
      minNotice: 1,
      carryForward: false,
      maxCarryForward: 0,
      probationEligible: true,
      documentRequired: false,
      description: 'Short-term personal leave for urgent matters'
    },
    {
      id: 4,
      name: 'Maternity Leave',
      type: 'paid',
      maxDaysPerYear: 180,
      maxConsecutiveDays: 180,
      minNotice: 30,
      carryForward: false,
      maxCarryForward: 0,
      probationEligible: false,
      documentRequired: true,
      description: 'Maternity leave as per government regulations'
    },
    {
      id: 5,
      name: 'Loss of Pay',
      type: 'unpaid',
      maxDaysPerYear: 365,
      maxConsecutiveDays: 30,
      minNotice: 3,
      carryForward: false,
      maxCarryForward: 0,
      probationEligible: true,
      documentRequired: false,
      description: 'Unpaid leave when other leave types are exhausted'
    }
  ]);

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'paid',
      maxDaysPerYear: '',
      maxConsecutiveDays: '',
      minNotice: '',
      carryForward: false,
      maxCarryForward: '',
      probationEligible: false,
      documentRequired: false,
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
      setLeaveRules(prev => 
        prev.map(rule => 
          rule.id === editingRule ? { ...formData, id: editingRule } : rule
        )
      );
    } else {
      setLeaveRules(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    setLeaveRules(prev => prev.filter(rule => rule.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
          <div className="p-4 border-b border-gray-200" style={{ backgroundColor: '#06425F' }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-white" />
                <h1 className="text-xl font-bold text-white">Leave Rules Management</h1>
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
                <FileText className="w-4 h-4" />
                {editingRule ? 'Edit Leave Rule' : 'Add New Leave Rule'}
              </h2>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Leave Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Annual Leave"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Days/Year</label>
                  <input
                    type="number"
                    value={formData.maxDaysPerYear}
                    onChange={(e) => setFormData({...formData, maxDaysPerYear: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="21"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Consecutive Days</label>
                  <input
                    type="number"
                    value={formData.maxConsecutiveDays}
                    onChange={(e) => setFormData({...formData, maxConsecutiveDays: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Notice (Days)</label>
                  <input
                    type="number"
                    value={formData.minNotice}
                    onChange={(e) => setFormData({...formData, minNotice: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Carry Forward</label>
                  <input
                    type="number"
                    value={formData.maxCarryForward}
                    onChange={(e) => setFormData({...formData, maxCarryForward: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="5"
                    disabled={!formData.carryForward}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="carryForward"
                    checked={formData.carryForward}
                    onChange={(e) => setFormData({...formData, carryForward: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="carryForward" className="text-sm text-gray-700">Allow Carry Forward</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="probationEligible"
                    checked={formData.probationEligible}
                    onChange={(e) => setFormData({...formData, probationEligible: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="probationEligible" className="text-sm text-gray-700">Probation Eligible</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="documentRequired"
                    checked={formData.documentRequired}
                    onChange={(e) => setFormData({...formData, documentRequired: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="documentRequired" className="text-sm text-gray-700">Document Required</label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Detailed description of leave rule..."
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
          {leaveRules.map((rule) => (
            <div key={rule.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#06425F' }}>
                      {rule.type === 'paid' ? <DollarSign className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rule.type === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {rule.type === 'paid' ? 'Paid' : 'Loss of Pay'}
                    </span>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      Max Days/Year
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.maxDaysPerYear}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      Max Consecutive
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.maxConsecutiveDays}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      Min Notice
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{rule.minNotice} days</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Users className="w-4 h-4" />
                      Carry Forward
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {rule.carryForward ? `${rule.maxCarryForward} days` : 'No'}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    {rule.probationEligible ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">Probation Eligible</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {rule.documentRequired ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">Document Required</span>
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

export default LeaveRules;