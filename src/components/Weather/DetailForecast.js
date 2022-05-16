import React from "react";

function DetailForecast(props){
// let all_list_el = props.list.map(el=>{
//     return(
//         <div className="list_item" key={props.list.indexOf(el)}>
//             {el}
//         </div>
//     )
// })

console.log(props.list);

return(
    <div className="detail_forecast">
        <h3 className="title">{props.title}</h3>
        {/* <div className="list">
            {all_list_el}
        </div> */}
    </div>
)
}

export default DetailForecast