import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div class="container">
        <div 
            class="spinner">
        </div>
             <p>Loading ...</p>

  </div>
  )
}

//  const loading = useSelector((state) => state.loading);

//  if (loading === true) {
//    return (
//     </div>
//   </div>
//   </div>
//   </div>
// } else {
//     return <Loading />;