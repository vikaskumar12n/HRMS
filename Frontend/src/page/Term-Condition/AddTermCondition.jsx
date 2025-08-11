import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { X } from "lucide-react";
// import { usePolicyAddMutation, usePolicyEditMutation, useTermAddMutation, useTermEditMutation } from "../../rtk/policy";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function EmployeeAddTerm() {
  const location = useLocation();
  const policyData = location.state?.policyEdit;
  const navigate = useNavigate();
  // const [policyAdd, { isLoading: policyAddLoading, error }] =
  //   useTermAddMutation();
  // const [policyEdit, { isLoading: policyLoading }] = useTermEditMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (policyData) {
      setTitle(policyData.title);
      setDescription(policyData.description);
    }
  }, [policyData]);

  const titleAdd = async () => {
    try {
      if (policyData) {
        const id = policyData._id;
        const response = await policyEdit({ id, title, description });
        if (response.data.success) {
          navigate("/dashboard/term-condition");
        }
      } else {
        const response = await policyAdd({ title, description });
        if (response.data.success) {
          navigate("/dashboard/term-condition");
        }
      }
    } catch (err) {
      return console.log(err.message);
    }
  };

  const chandPage = () => {
    navigate("/dashboard/term-condition");
  };

  if (policyLoading || policyAddLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={30} color="blue" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-400">
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h2 className="text-xl font-semibold">Term & Condition</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={20} onClick={chandPage} />
        </button>
      </div>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title here"
            className="border border-gray-500 h-8 rounded-sm pl-2 pr-10"
          ></input>
        </div>
      </div>
      <SunEditor
        setContents={description}
        onChange={(content) => {
          // SunEditor से content को raw format में लें और सीधे save करें
          setDescription(content);
        }}
        className="border border-red-500 min-h-[40rem]"
        setOptions={{
          height: "300px", // ✅ Editor ki height badha di
          minHeight: "300px", // ✅ Minimum height set kar di
          buttonList: [
            ["undo", "redo"], // Undo/Redo
            ["bold", "underline", "italic", "strike"], // Text Formatting
            ["font", "fontSize", "formatBlock"], // ✅ Font Customization
            ["fontColor", "hiliteColor"], // ✅ Text Color & Background Color
            ["align", "list", "lineHeight"], // Text Alignment & Spacing
            ["table"], // ✅ Insert & Edit Table
            ["link"], // ✅ Hyperlink Support (Internal & External Links)
            ["image", "video"], // ✅ Media Support
            ["codeView"], // View HTML Code
          ],
          linkProtocol: "", // ✅ Disable default "http://"
          // attributesWhitelist: {
          //   a: "href target title class download", // ✅ Allow custom attributes
          // },
          addTagsWhitelist: "a[href]", // Allow href attribute explicitly
          sanitize: false, // Disable automatic sanitization
          defaultTag: "div",
        }}
      />
      <div className="flex max-w-4xl mt-4 space-x-4">
        <button
          className="px-6 py-1 bg-blue-500 rounded-sm text-white hover:bg-blue-700 transition"
          onClick={titleAdd}
        >
          Submit
        </button>
        <button
          className="px-6 py-1 bg-gray-300 text-gray-800 rounded-sm hover:bg-gray-400 transition"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
