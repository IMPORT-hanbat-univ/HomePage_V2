import React from "react"
import UserNav from "../UserNav"


export default function Header(){
    return (
        <header className="h-[60px] fixed z-10 flex justify-between items-center px-[75px] w-full">
            <h2 className="leading-8 text-[28px]">Import</h2>
            <menu className="flex justify-between items-center text-base leading-4 gap-[90px]">
                <div >About</div>
                <div >Community</div>
                <div>Project</div>
            </menu>
            <div>
               <UserNav />
            </div>

        </header>
    )
}