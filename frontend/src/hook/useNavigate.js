
let navigationFun;

export const setNavigator = (navFun) => {
    navigationFun = navFun;
}


export const navigate = (to, option={}) => {
    if(navigationFun) {
        navigationFun(to, option);
    }
}