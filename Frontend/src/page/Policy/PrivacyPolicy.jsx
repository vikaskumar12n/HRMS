import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-sm text-gray-600">Last updated:{new Date().toLocaleDateString('en-GB')}</p>
            </div>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">We collect the following types of information:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>Employee Data:</strong> Name, contact details, employee ID, department, designation</li>
                            <li>• <strong>Attendance Records:</strong> Check-in/out times, work hours, location data</li>
                            <li>• <strong>Leave Management:</strong> Leave applications, balances, approval status</li>
                            <li>• <strong>Banking Information:</strong> Account details for salary processing</li>
                            <li>• <strong>Documents:</strong> ID proofs, contracts, certificates uploaded by employees</li>
                            <li>• <strong>Company Profile:</strong> Organization details, policies, settings</li>
                            <li>• <strong>Company Profile:</strong> Organization details, policies, settings</li>
                            <li>• <strong>payroll:</strong>Manage employee salaries, apply deductions, and configure payroll settings and policies</li>
                            <li>• <strong>Work:</strong>Track employee work schedules</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-medium text-blue-900 mb-2">HR Operations</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Process attendance and leave requests</li>
                                <li>• Generate payroll and reports</li>
                                <li>• Manage employee records</li>
                                <li>• Send notifications and updates</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-medium text-green-900 mb-2">Administrative</h3>
                            <ul className="text-sm text-green-800 space-y-1">
                                <li>• Maintain company policies</li>
                                <li>• Ensure compliance with labor laws</li>
                                <li>• Facilitate internal communication</li>
                                <li>• Document management</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Data Security</h2>
                    <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                                <span className="text-red-600 text-sm">🔒</span>
                            </div>
                            <div>
                                <p className="text-sm text-red-800 mb-2">We implement robust security measures:</p>
                                <ul className="text-sm text-red-700 space-y-1">
                                    <li>• Encrypted data transmission and storage</li>
                                    <li>• Role-based access controls</li>
                                    <li>• Regular security audits and updates</li>
                                    <li>• Secure backup and recovery systems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Sharing</h2>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm text-yellow-800 mb-2">We may share your data with:</p>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• Authorized HR personnel and management</li>
                            <li>• Third-party payroll processors (encrypted)</li>
                            <li>• Legal authorities when required by law</li>
                            <li>• IT service providers under strict confidentiality</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Your Rights</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-purple-50 p-3 rounded-lg">
                            <h3 className="font-medium text-purple-900 mb-1">Access</h3>
                            <p className="text-sm text-purple-800">View your personal data stored in the system</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                            <h3 className="font-medium text-purple-900 mb-1">Correction</h3>
                            <p className="text-sm text-purple-800">Update or correct inaccurate information</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                            <h3 className="font-medium text-purple-900 mb-1">Deletion</h3>
                            <p className="text-sm text-purple-800">Request data deletion upon employment termination</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Module-Specific Privacy</h2>
                    <div className="space-y-3">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="font-medium text-gray-800">Attendance Module</h3>
                            <p className="text-sm text-gray-600">Location data used only for attendance verification, not tracking</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="font-medium text-gray-800">Leave Module</h3>
                            <p className="text-sm text-gray-600">Leave history maintained for policy compliance and reporting</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-medium text-gray-800">Banking Module</h3>
                            <p className="text-sm text-gray-600">Financial data encrypted and accessed only by authorized personnel</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="font-medium text-gray-800">Document Module</h3>
                            <p className="text-sm text-gray-600">Personal documents stored securely with access logs</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-medium text-gray-800">Payroll Module</h3>
                            <p className="text-sm text-gray-600"> Manage salaries, generate, and store personal documents securely with access logs.</p>
                        </div>
                        <div className="border-l-4 border-green-500-500 pl-4">
                            <h3 className="font-medium text-gray-800">Work Module</h3>
                            <p className="text-sm text-gray-600"> Track employee work schedules, roles, and assignments with secure access logs.</p>
                        </div>
                        <div className="border-l-4 border-green-500-500 pl-4">
                            <h3 className="font-medium text-gray-800">Company Profile Module</h3>
                            <p className="text-sm text-gray-600">  Manage and update company information, mission, vision, and policies in one centralized place.</p>
                        </div>

                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Data Retention</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">We retain data as follows:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Employee records: During employment + 7 years post-termination</li>
                            <li>• Attendance data: 3 years for compliance purposes</li>
                            <li>• Leave records: 5 years for audit requirements</li>
                            <li>• Banking information: Deleted immediately upon termination</li>
                            <li>• Documents: As per legal requirements (typically 7 years)</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contact Information</h2>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm text-indigo-800 mb-2">For privacy-related queries, contact:</p>
                        <div className="space-y-1 text-sm text-indigo-700">
                            <p>📧 Email: info@codecrafter.co.in</p>
                            <p>📞 Phone: +91 884-070-176</p>
                            <p>🏢 Address: D2/119, 1st Floor, Rolex Tower, Vibhuti Khand, Gomti Nagar, Lucknow 226010</p>
                            {/* <p>👤 Data Protection Officer: [Name]</p> */}
                        </div>
                    </div>
                </section>

                <section className="p-4 md:p-8 bg-white text-gray-800">
                    <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

                    <p className="text-sm text-gray-600 mb-6">
                        Last Updated: <span>{new Date("2025-07-14").toLocaleDateString("en-GB")}</span>
                    </p>

                    <p className="mb-4">
                        <strong>Code Crafter Web Solutions</strong> ("we", "our", "us") is committed to protecting the privacy
                        and security of your personal information. This Privacy Policy outlines how we collect, use, store,
                        and share data in connection with our Human Resource Management System (HRMS) mobile and web application
                        (the “App”).
                    </p>

                    <ul className="list-disc list-inside space-y-2 mb-6">
                        <li>
                            <strong>Attendance Records:</strong> Check-in/out times, total work hours, and real-time location
                            coordinates (latitude/longitude) only during punch-in/out.
                        </li>
                        <li>
                            <strong>Documents:</strong> Photos and files (e.g., ID proofs, certificates) uploaded by employees via the app.
                        </li>
                        <li>
                            <strong>Device & Location Data:</strong>
                            <ul className="list-disc list-inside ml-6">
                                <li>Precise location (GPS): Only when punching in/out.</li>
                                <li>Device storage: For saving and uploading documents.</li>
                                <li>Camera: For document/photo capture if permitted.</li>
                            </ul>
                        </li>
                    </ul>

                    <h2 className="text-lg font-semibold text-gray-800 mb-2">. Location Permission and Usage</h2>
                    <p className="mb-4">
                        We request <code>ACCESS_FINE_LOCATION</code> and <code>ACCESS_COARSE_LOCATION</code> to capture user location during punch-in/punch-out only.
                        We do not track or collect location data in the background or when the app is closed. Background location
                        access is only declared in the manifest as per Android requirements but is not actively used or stored.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-800 mb-2">. Storage and Camera Access</h2>
                    <p className="mb-4">
                        The app requests <code>READ_EXTERNAL_STORAGE</code>, <code>WRITE_EXTERNAL_STORAGE</code>, and <code>CAMERA</code> to allow uploading ID proofs
                        and other HR documents. Data is stored locally on the device and securely uploaded to our servers under
                        encryption. No data is accessed without the user’s explicit action and consent.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Policy Updates</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            This policy may be updated periodically. Employees will be notified of significant changes via email
                            and system notifications. Continued use of the system constitutes acceptance of updated terms.
                        </p>
                    </div>
                </section>


                <div className="mt-8 pt-4 border-t border-gray-200">
                    <p className="text-sm text-white text-center  bg-black h-8 rounded-sm pt-2 font-bold ">
                        © {new Date().getFullYear()} [code crafter web solutions]. All rights reserved.
                        This privacy policy is effective as of {new Date().toLocaleDateString('en-Gb')}.
                    </p>
                </div>
            </div>
        </div>
    );
}