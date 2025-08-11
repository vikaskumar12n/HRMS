// isConfirmed.js
import Swal from 'sweetalert2';

const isConfirmed =  async({description}) => {
  try {
    const result =  await Swal.fire({
      title: "Are you sure?",
      text: description,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Done",
    });



    return result.isConfirmed; // ✅ true if confirmed, false if canceled
  } catch (error) {
    console.error("Confirmation error:", error);
    return false;
  }
};

export default isConfirmed;
