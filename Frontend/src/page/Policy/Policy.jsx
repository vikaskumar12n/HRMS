import React, { useEffect, useState } from 'react';
import { Trash2, Edit, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { usePolicyAllQuery, usePolicyDeleteMutation } from '../../rtk/policy';
import { isConfirm } from '../../helper/SweetAlrertIsConfirm';
import { ClipLoader } from 'react-spinners';

export default function Policy() {
  const { data: policies, isLoading, refetch } = usePolicyAllQuery();
  const [deletePolicyApi] = usePolicyDeleteMutation();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId===null?id:null)
  };

  const filteredPolicies = policies?.filter((policy) =>
    policy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletePolicy = async (id) => {
    const result = await isConfirm();
    if (result) {
      await deletePolicyApi({ id });
      refetch();
    }
  };

  const addNewPolicy = () => {
    navigate("/dashboard/employee/add/policy");
  };

  // edit
  const editPolicy=(policy)=>{
        navigate("/dashboard/employee/add/policy", { state: { policyEdit: policy } });
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ClipLoader color='blue' size={30} />
      </div>
    );
  }


  const ViewPolicy = (policy) => {
    setSelectedPolicy(policy);
         
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white max-w-2xl w-full p-6 rounded shadow-lg relative">
          <button className="absolute top-2 right-2 text-red-500 font-bold" onClick={() => setSelectedPolicy(null)}>X</button>
          <h2 className="text-lg font-semibold mb-4">{policy.title}</h2>
          <div
            className="text-sm text-gray-700 space-y-2 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: policy.description }}
          />
        </div>
      </div>
    );
  };
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Policies</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
            />
            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>
          <button
            onClick={addNewPolicy}
            className="flex items-center gap-1 px-4 py-2 bg-[#075271] hover:bg-[#075290] text-white font-medium rounded-md transition-colors duration-300"
          >
            <Plus size={20} />
            Create
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {filteredPolicies?.map((policy) => (
          <div key={policy._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between h-full">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <h3 className="font-semibold text-gray-800">{policy.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-gray-700" 
                    onClick={()=>editPolicy(policy)}
                   >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-500"
                    onClick={() => deletePolicy(policy._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => toggleExpand(policy._id)}
                  >
                    {/* {expandedId === policy._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />} */}
                  </button>
                </div>
              </div>

              {(
                <div id={policy._id} className="mt-3 max-h-[250px] overflow-y-auto">

                  <div
                    className="text-sm text-gray-700 space-y-2 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: policy.description }}
                  />
                </div>
              )}
            </div>
            <div className="px-4 py-3 bg-gray-50">
              <button className="w-full py-2 text-sm text-white bg-[#075271] hover:bg-[#075250] rounded transition-colors duration-300" 
              onClick={() =>ViewPolicy(policy)}>
                View policy
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPolicy && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded shadow-lg relative">
            <button 
              className="absolute top-2 right-2 text-red-500 font-bold" 
              onClick={() => setSelectedPolicy(null)}
            >
              X
            </button>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-center mb-2">{selectedPolicy.title}</h2>
              <div className="border-b border-gray-200 mb-4"></div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700">Purpose:</h3>
                <p className="text-gray-600">
                  To set expectations for professional behavior and ensure a 
                  respectful and ethical workplace.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Body:</h3>
                <div 
                  className="text-gray-600 mt-2 prose max-w-none overflow-y-auto max-h-96"
                  dangerouslySetInnerHTML={{ __html: selectedPolicy.description }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
