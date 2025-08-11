import Swal from "sweetalert2";

 const isConfirm = async () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => result.isConfirmed);
};


const ischeck = async () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able checkout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes ?",
  }).then((result) => result.isConfirmed);
};


const isleaveConfirm = async () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able delet leave?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes ?",
  }).then((result) => result.isConfirmed);
};



export{isConfirm,ischeck,isleaveConfirm}