import React from 'react';
import { FileText, Users, Globe, Shield, CreditCard } from 'lucide-react';

const Policies = () => {
  const terms = [
    {
      id: 1,
      title: "General Terms and Conditions",
      icon: <FileText className="w-6 h-6" />,
      content: `These Terms and Conditions ("Terms") govern your use of services provided by Code Crafter Web Solutions, a web development company located in Lucknow, India. By engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.

      Code Crafter Web Solutions reserves the right to modify these Terms at any time without prior notice. It is the client's responsibility to review these Terms periodically for any changes. Continued use of our services after modifications constitutes acceptance of the updated Terms.

      All agreements between Code Crafter Web Solutions and clients are subject to these Terms unless otherwise specified in a separate written contract. These Terms supersede all prior negotiations, representations, or agreements relating to the subject matter herein.`
    },
    {
      id: 2,
      title: "Service Agreement and Scope",
      icon: <Globe className="w-6 h-6" />,
      content: `Code Crafter Web Solutions provides web development, web design, mobile application development, digital marketing, and related technology services. The specific scope of work will be detailed in a separate project proposal or statement of work (SOW) for each engagement.

      All services are provided on a project basis unless otherwise specified in a maintenance or retainer agreement. Project timelines and deliverables will be clearly defined in the project proposal. Any changes to the agreed scope of work may result in additional charges and timeline adjustments.

      Client is responsible for providing all necessary materials, content, assets, and information required for project completion. Delays in providing required materials may impact project timelines and delivery dates. Code Crafter Web Solutions is not responsible for delays caused by client's failure to provide necessary materials.`
    },
    {
      id: 3,
      title: "Payment Terms and Billing",
      icon: <CreditCard className="w-6 h-6" />,
      content: `Payment terms are Net 30 days from invoice date unless otherwise specified in the project agreement. For projects exceeding INR 50,000, a 50% advance payment is required before commencement of work. The remaining balance is due upon project completion and client approval.

      All prices are quoted in Indian Rupees (INR) and are exclusive of applicable taxes. Goods and Services Tax (GST) will be added to all invoices as per Indian tax regulations. Late payment charges of 2% per month may be applied to overdue amounts.

      Code Crafter Web Solutions reserves the right to suspend work on any project with outstanding payments exceeding 30 days. Project deliverables and source code will not be released until all payments are received in full. Payment can be made via bank transfer, UPI, or other agreed methods.`
    },
    {
      id: 4,
      title: "Intellectual Property Rights",
      icon: <Shield className="w-6 h-6" />,
      content: `Upon full payment, all custom code, designs, and materials developed specifically for the client will be transferred to the client. However, Code Crafter Web Solutions retains rights to any pre-existing intellectual property, frameworks, libraries, and general methodologies used in the development process.

      Client represents and warrants that all materials provided to Code Crafter Web Solutions, including text, images, logos, and other content, are either owned by the client or used with proper authorization. Client indemnifies Code Crafter Web Solutions against any claims arising from the use of client-provided materials.

      Code Crafter Web Solutions may showcase completed projects in its portfolio and marketing materials unless explicitly prohibited by a non-disclosure agreement. Client's logo and project description may be used for promotional purposes with client's consent.`
    },
    {
      id: 5,
      title: "Warranties and Limitations",
      icon: <Users className="w-6 h-6" />,
      content: `Code Crafter Web Solutions warrants that all services will be performed in a professional manner consistent with industry standards. We provide a 30-day warranty on all custom development work for bug fixes and minor adjustments. This warranty does not cover new feature requests or modifications to original specifications.

      Code Crafter Web Solutions makes no warranties regarding third-party services, plugins, or platforms integrated into client projects. Client acknowledges that web technologies are constantly evolving, and future compatibility issues may arise that are beyond our control.

      In no event shall Code Crafter Web Solutions be liable for any indirect, incidental, special, or consequential damages arising out of the use or inability to use our services. Our total liability shall not exceed the amount paid by the client for the specific service giving rise to the claim.

      Force majeure events including but not limited to natural disasters, government actions, internet outages, or other circumstances beyond our reasonable control shall excuse performance delays or failures.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6" style={{borderTop: '4px solid #06425F'}}>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{color: '#06425F'}}>Terms and Conditions</h1>
          <p className="text-gray-600">Code Crafter Web Solutions, Lucknow</p>
        </div>
      </div>

      {/* Terms List */}
      <div className="space-y-6">
        {terms.map(term => (
          <div key={term.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow" style={{borderLeft: '4px solid #06425F'}}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{backgroundColor: '#06425F20', color: '#06425F'}}>
                  {term.icon}
                </div>
                <h2 className="text-xl font-bold" style={{color: '#06425F'}}>{term.title}</h2>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                  {term.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12">
        <div className="bg-white rounded-lg shadow-sm border p-6" style={{borderTop: '2px solid #06425F'}}>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Last Updated: 2025
            </p>
            <p className="text-sm text-gray-600">
              For questions regarding these Terms and Conditions, please contact us at support@codecrafter.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;