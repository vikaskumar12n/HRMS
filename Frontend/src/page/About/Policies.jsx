import React from 'react';
import { FileText, Users, Clock, Shield, Heart } from 'lucide-react';

const Policies = () => {
  const policies = [
    {
      id: 1,
      title: "Employee Code of Conduct",
      icon: <Shield className="w-6 h-6" />,
      content: `Code Crafter Web Solutions expects all employees to maintain the highest standards of professional conduct and integrity. All employees must treat colleagues, clients, and stakeholders with respect and courtesy at all times. Discrimination, harassment, or any form of inappropriate behavior will not be tolerated in the workplace.

      Employees are expected to arrive on time, dress appropriately, and maintain confidentiality of sensitive company information. Personal use of company resources should be minimal and must not interfere with work responsibilities. Any conflicts of interest must be disclosed to management immediately.

      Social media usage should reflect positively on the company, and employees should not share confidential information online. Violation of this code may result in disciplinary action up to and including termination of employment.`
    },
    {
      id: 2,
      title: "Leave Policy",
      icon: <Clock className="w-6 h-6" />,
      content: `Code Crafter Web Solutions provides comprehensive leave benefits to ensure work-life balance for all employees. Annual leave entitlement is 21 days per year for all full-time employees, which can be carried forward to the next year with management approval.

      Sick leave is provided up to 12 days annually and requires medical certification for absences exceeding 3 consecutive days. Maternity leave is granted for 6 months as per government regulations, while paternity leave is 15 days. Emergency leave can be granted for family emergencies or unforeseen circumstances.

      All leave requests must be submitted through the HRMS system at least 7 days in advance, except for emergency situations. Leave approval is subject to business requirements and team availability. Unused leave may be encashed at the end of the year as per company policy.`
    },
    {
      id: 3,
      title: "Work From Home Policy",
      icon: <Users className="w-6 h-6" />,
      content: `Code Crafter Web Solutions supports flexible work arrangements to enhance productivity and employee satisfaction. Employees may work from home up to 2 days per week with prior approval from their immediate supervisor. Remote work privileges are based on role requirements and individual performance.

      Employees working from home must maintain the same work hours and availability as office-based work. A reliable internet connection, appropriate workspace, and necessary equipment must be ensured for effective remote work. All company data security protocols must be strictly followed when working remotely.

      Regular check-ins with supervisors are required, and attendance at important meetings or client presentations may require physical presence in the office. This policy may be adjusted based on business needs and project requirements.`
    },
    {
      id: 4,
      title: "Performance Evaluation",
      icon: <FileText className="w-6 h-6" />,
      content: `Performance evaluations at Code Crafter Web Solutions are conducted annually to assess employee contributions and identify development opportunities. The evaluation process includes self-assessment, supervisor review, and goal setting for the upcoming year.

      Key performance indicators include quality of work, meeting deadlines, teamwork, innovation, and client satisfaction. Employees receive feedback on their strengths and areas for improvement, along with a development plan to enhance their skills and career growth.

      Performance ratings directly impact salary increments, promotions, and bonus eligibility. Exceptional performers may be considered for leadership roles or special projects. Regular quarterly reviews ensure ongoing feedback and support throughout the year.`
    },
    {
      id: 5,
      title: "Health and Safety",
      icon: <Heart className="w-6 h-6" />,
      content: `Code Crafter Web Solutions is committed to providing a safe and healthy work environment for all employees. The company maintains comprehensive health insurance coverage for employees and their immediate family members, including medical, dental, and vision care.

      All employees receive ergonomic workstations to prevent repetitive strain injuries and promote good posture. Regular health checkups are organized annually, and mental health support is available through counseling services. First aid facilities and trained personnel are available on-site.

      Employees are encouraged to report any safety hazards or health concerns immediately. The company follows all local safety regulations and conducts regular safety drills. Work-related injuries must be reported within 24 hours for proper documentation and care.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6" style={{borderTop: '4px solid #06425F'}}>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{color: '#06425F'}}>HR Policies</h1>
          <p className="text-gray-600">Code Crafter Web Solutions, Lucknow</p>
        </div>
      </div>

      {/* Policies List */}
      <div className="space-y-6">
        {policies.map(policy => (
          <div key={policy.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow" style={{borderLeft: '4px solid #06425F'}}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{backgroundColor: '#06425F20', color: '#06425F'}}>
                  {policy.icon}
                </div>
                <h2 className="text-xl font-bold" style={{color: '#06425F'}}>{policy.title}</h2>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                  {policy.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;