import Swal from 'sweetalert2';

const successAlert = (title) => {
    return Swal.fire({
        icon: "success",
        title: title,
        confirmButtonColor: "#00b050"
    });
};

export default successAlert;
