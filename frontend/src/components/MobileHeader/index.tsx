import React from "react"
import Link from "next/link"
export default function MobileHeader() {
    return (
        <header className="w-full">
            <div  className="flex border-b shadow-sm bg-white justify-between items-center px-3 h-[60px] fixed w-full ">
                <svg width="44px" height="44px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path> 
                        <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path> 
                        <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path> 
                    </g>
                </svg>
                <Link href="/" className="text-lg font-semibold">Import</Link>
                <div>

                </div>
            </div>
        </header>
    )
}