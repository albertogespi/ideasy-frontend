import React, { useState } from "react";
import { uploadAvatar, getProfile } from "../http/userService";

// export function FileUpload() {
//   const [file, setFile] = useState();

//   const handleChange = e => {
//     console.log(e.target.files);
//     setFile(e.target.files);
//   };

//   const handleUpload = () => {
//     if (!file) {
//       console.log("no hay ná");
//       return;
//     }

//     const data = new FormData();
//     data.append("avatar", file[0]);
//     console.log(file[0]);
//     console.log(data);

//     uploadAvatar(data)
//       .then(response => {
//         console.log(response.data);
//         setFile(null);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <main>
//       <input type="file" onChange={handleChange} />

//       <button type="button" onClick={handleUpload}>
//         Cambiar Foto
//       </button>
//     </main>
//   );
// }
