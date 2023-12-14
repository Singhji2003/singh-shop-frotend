import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ()=>{
    const {pathanme} = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathanme])
    return null;
}
export default ScrollToTop;