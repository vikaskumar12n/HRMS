import React, { useState } from 'react';
import {
    Menu,
    X,
    Search,
    Plus,
    Bell,
    ChevronDown,
    Users,
    FileText,
    Calendar,
    DollarSign,
    Settings,
    Shield,
    Clock,
    CreditCard,
    User,
    Building,
    TrendingUp,
    Zap,
    MessageSquare,
    Phone,
    BarChart3,
    Megaphone,
    Rocket
} from 'lucide-react';

const HomeDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleExpanded = (item) => {
        setExpandedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const sidebarItems = [
        { name: 'Dashboard', icon: BarChart3, hasSubmenu: false },
        {
            name: 'Company Profile',
            icon: Building,
            hasSubmenu: true,
            subItems: ['', '', '', '', '', '', '', '']
        },
        {
            name: 'My Profile',
            icon: User,
            hasSubmenu: true,
            subItems: ['', '', '', '', '', '']
        },
        { name: 'Directory', icon: Users, hasSubmenu: false },
        {
            name: 'Attendance',
            icon: Clock,
            hasSubmenu: true,
            subItems: ['', '', '', '', '', '']
        },
        {
            name: 'Leave',
            icon: Calendar,
            hasSubmenu: true,
            subItems: ['', '', '']
        },
        {
            name: 'Payroll',
            icon: DollarSign,
            hasSubmenu: true,
            subItems: ['', '', '', '', '']
        },
        { name: 'Expense Payout', icon: CreditCard, hasSubmenu: false },
        { name: 'Reports', icon: FileText, hasSubmenu: false },
        { name: 'Insurance Management', icon: Shield, hasSubmenu: false },
        { name: 'Organization Chart', icon: Users, hasSubmenu: false },
        { name: 'Holiday Calendar', icon: Calendar, hasSubmenu: false },
        { name: 'Konnect', icon: MessageSquare, hasSubmenu: false },
        { name: 'Settings', icon: Settings, hasSubmenu: false }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-[#075271] shadow-sm border-b border-gray-200 sticky top-0 z-40 text-white">
                <div className="flex items-center justify-between px-16 py-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md hover:bg-gray-100 bg-white text-black "
                        >
                            <Menu size={20} />
                        </button>

                        <div className="flex items-center space-x-2">
                            <div className="text-2xl font-bold text-white">
                                
                                C<span className="text-red-500">O</span>DE CRAFTER
                            </div>
                            <span className="bg-blue-500 text-black text-xs px-2 py-1 rounded">
                                Getting Started
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <span className="text-lg text-white">Hi Ayush !</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Employees"
                                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                />
                                <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
                            </div>
                            {/* <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-2">
                                <Plus size={16} />
                                <span className="hidden lg:block">Add Employee</span>
                            </button> */}
                        </div>

                        <div className="text-sm text-white hidden lg:block">
                            WED 11, JUN 2025
                        </div>

                        <div className="flex items-center space-x-2">
                            <Bell className="text-gray-600" size={20} />
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                A
                            </div>
                            <ChevronDown size={16} className="text-gray-600" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex container mx-auto px-20">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out  `}>
                    <div className="flex items-center justify-between p-4 border-b ">
                        <span className="text-lg font-semibold">Menu</span>
                        <button onClick={toggleSidebar}>
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="mt-4 lg:mt-0 overflow-y-auto h-full pb-20">
                        {sidebarItems.map((item, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => item.hasSubmenu && toggleExpanded(item.name)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon size={20} className="text-gray-600" />
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    {item.hasSubmenu && (
                                        <ChevronDown
                                            size={16}
                                            className={`text-gray-400 transition-transform ${expandedItems[item.name] ? 'rotate-180' : ''}`}
                                        />
                                    )}
                                </button>

                                {item.hasSubmenu && expandedItems[item.name] && (
                                    <div className="pl-12 py-2 space-y-1">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <div key={subIndex} className="py-1">
                                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-opacity-50 z-40 "
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6">
                    {/* Left Section */}
                    <div className="flex">
                        {/* Left Sidebar */}
                        <div className={`
          fixed lg:relative lg:translate-x-0 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-80 bg-white shadow-lg h-screen overflow-y-auto z-50 lg:z-auto
        `}>
                            <div className="p-6 space-y-6">
                                {/* Company Logo Section */}
                                <div className="bg-white rounded-lg p-6 shadow-sm border">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                        <Plus className="mx-auto mb-4 text-gray-400" size={48} />
                                        <p className="text-gray-500 mb-2">Your Company Logo</p>
                                        <p className="text-gray-400 text-sm">Comes Here</p>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h2 className="text-xl font-semibold text-gray-800">codcra</h2>
                                    </div>
                                </div>

                                {/* Tasks and Notifications */}
                                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
                                    <h3 className="text-lg font-semibold mb-4">Tasks and Notifications</h3>
                                    <div className="flex items-center space-x-3">
                                        <FileText size={20} />
                                        <span className="text-sm">2 Employees have not activated their accounts</span>
                                    </div>
                                </div>

                                {/* Schedule Demo */}
                                <div className="bg-gray-800 rounded-lg p-6">
                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                        Schedule Demo
                                    </button>
                                </div>

                                {/* Kredily Prime */}

                            </div>
                        </div>

                        {/* Overlay for mobile */}
                        {sidebarOpen && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                                onClick={toggleSidebar}
                            />
                        )}

                        {/* Main Content Area */}
                        <div className="flex-1 lg:ml-0">
                            <div className="p-6">
                                <div className="flex flex-col xl:flex-row gap-6">
                                    {/* Center Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="bg-white rounded-lg p-8 shadow-sm">
                                                                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white relative overflow-hidden">
                                    <div className="absolute top-0 left-0 bg-yellow-400 text-black px-3 py-1 text-sm font-semibold rounded-br-lg">
                                        Kredily Prime
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 mt-6">
                                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-black">
                                            <Clock className="mx-auto mb-2" size={24} />
                                            <span className="text-xs font-medium">Loans</span>
                                        </div>
                                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-black">
                                            <CreditCard className="mx-auto mb-2" size={24} />
                                            <span className="text-xs font-medium">Credit Card</span>
                                        </div>
                                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center  text-black">
                                            <Shield className="mx-auto mb-2" size={24} />
                                            <span className="text-xs font-medium">Insurance</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Feature Cards */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <Users className="mx-auto mb-2 text-orange-500" size={28} />
                                        <p className="text-xs font-medium text-gray-700">Konnect</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer relative">
                                        <FileText className="mx-auto mb-2 text-blue-500" size={28} />
                                        <p className="text-xs font-medium text-gray-700">ID & Visiting Card</p>
                                        <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1 rounded-full">❤️</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer relative">
                                        <User className="mx-auto mb-2 text-yellow-500" size={28} />
                                        <p className="text-xs font-medium text-gray-700">Directory</p>
                                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <Shield className="mx-auto mb-2 text-blue-400" size={28} />
                                        <p className="text-xs font-medium text-gray-700">Insurance Mgmt</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <TrendingUp className="mx-auto mb-2 text-purple-500" size={28} />
                                        <p className="text-xs font-medium text-gray-700">PMS</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <Calendar className="mx-auto mb-2 text-blue-500" size={28} />
                                        <p className="text-xs font-medium text-gray-700">Calendar</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <Zap className="mx-auto mb-2 text-purple-500" size={28} />
                                        <p className="text-xs font-medium text-gray-700">Performance</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <DollarSign className="mx-auto mb-2 text-purple-600" size={28} />
                                        <p className="text-xs font-medium text-gray-700">Payroll</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <BarChart3 className="mx-auto mb-2 text-purple-500" size={28} />
                                        <p className="text-xs font-medium text-gray-700">Reports</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <MessageSquare className="mx-auto mb-2 text-blue-400" size={28} />
                                        <p className="text-xs font-medium text-gray-700">Support</p>
                                    </div>
                                </div>
                                            <div className="text-center">
                                                {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Kredily Dashboard</h2>
                                                <p className="text-gray-600 mb-6">Manage your company's HR operations efficiently</p> */}

                                                {/* Quick Stats */}
                                                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                                                        <h3 className="text-lg font-semibold mb-2">Total Employees</h3>
                                                        <p className="text-3xl font-bold">24</p>
                                                    </div>
                                                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                                                        <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
                                                        <p className="text-3xl font-bold">8</p>
                                                    </div>
                                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                                                        <h3 className="text-lg font-semibold mb-2">Pending Tasks</h3>
                                                        <p className="text-3xl font-bold">12</p>
                                                    </div>
                                                </div> */}

                                                {/* Recent Activity */}
                                                {/* <div className="bg-gray-50 rounded-lg p-6">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                                                            <span className="text-gray-700">New employee onboarded</span>
                                                            <span className="text-gray-500 text-sm">2 hours ago</span>
                                                        </div>
                                                        <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                                                            <span className="text-gray-700">Payroll processed</span>
                                                            <span className="text-gray-500 text-sm">1 day ago</span>
                                                        </div>
                                                        <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                                                            <span className="text-gray-700">Performance review completed</span>
                                                            <span className="text-gray-500 text-sm">3 days ago</span>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Sidebar */}
                                    <div className="w-full xl:w-80 space-y-4">
                                        {/* Company Announcement */}
                                        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 text-white relative overflow-hidden">
                                            <div className="absolute top-4 right-4">
                                                <Megaphone className="text-yellow-400" size={24} />
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">Company Announcement</h3>
                                            <p className="text-blue-100">hello test 123</p>
                                        </div>

                                        {/* Upgrade to Enterprise */}
                                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-6 text-white relative overflow-hidden">
                                            <div className="absolute top-4 right-4">
                                                <Rocket className="text-yellow-400" size={24} />
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">Upgrade to Enterprise</h3>
                                            <p className="text-purple-100 mb-4">Unlock More Features for Just Rs 29 PEPM!</p>
                                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                                                Upgrade Now
                                            </button>
                                        </div>

                                        {/* Learn How to Use */}
                                        <div className="bg-white rounded-lg p-6 shadow-sm">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 mb-1">Learn</h3>
                                                    <p className="text-gray-600 text-sm mb-2">How to</p>
                                                    <p className="text-gray-600 text-sm mb-4">Use</p>
                                                    <p className="font-semibold text-gray-800">Kredily</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="w-16 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                                                        <div className="w-8 h-6 bg-purple-500 rounded"></div>
                                                    </div>
                                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                                        Get Started
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Employee Onboarded */}
                                        <div className="bg-blue-500 rounded-lg p-6 text-white">
                                            <h3 className="font-semibold mb-2">Employee Onboarded</h3>
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-bold">4</div>
                                                <ChevronDown className="text-blue-200" size={20} />
                                            </div>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="bg-white rounded-lg p-6 shadow-sm">
                                            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                                            <div className="space-y-2">
                                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                                    Add New Employee
                                                </button>
                                                <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                                    Process Payroll
                                                </button>
                                                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                                    Generate Report
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default HomeDashboard;