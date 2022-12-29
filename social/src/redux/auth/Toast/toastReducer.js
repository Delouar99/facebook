//toast initaial state
const inttaitalState = {

    message : '',
    load : false,

}




//create toast reducer
const toastReducer = (state =inttaitalState, {type, payload}) => {

    switch (type) {
        case "":
            
            break;
    
        default:
         return state;
    }

}

//expoart deafult
export default toastReducer;