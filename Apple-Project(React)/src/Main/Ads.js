import React from "react";

export default function Ads() {

    const Ads ={
        display:"block",
        marginRight:"auto",
        marginLeft:"auto",
        textAlign: "center"
    }

    const style = {
        fontSize:"14px",
        height:"44px",
        padding:"12px 0",
        color:"#fff",
        display:"inline-block",
    }
    
    return (
        <>
            <div className="ads" style={Ads} >
                <span style={style} className="span">
                    Save up to ₹8000.00 instantly on eligible products with HDFC Bank Credit Cards.
                    <sub>
                        <a href="" className="span-anchor">*</a>
                    </sub>
                    Plus No Cost EMI from most leading banks.
                    <a href="" className="span-anchor">‡</a>
                    <a href="" className="span-link">Shop now {">"} </a>
                </span>
            </div>
        </>
    )

}