import React from "react"
import UserNav from "../UserNav"


export default function Header(){
    return (
        <header className="w-full ">
            <div className="h-[60px] fixed z-10 flex bg-white justify-between items-center px-[75px] w-full">
                <div className="flex items-center" >
                <h2 className="leading-8 text-[28px] mr-10">Import</h2>
                <menu className="flex relative justify-between group items-center text-base leading-4 gap-8">
                    <div className="group-hover">About</div>
                    <div >Community</div>
                    <div>Project</div>
                    <div className="top-[60px] right-0 z-20 w-screen hidden fixed h-64 animate-header-fade-in bg-black group-hover:block">
                        왜 안됨..
                    </div>      
                </menu>
                </div>
                <div>
                <UserNav />
                </div>
            </div>
           

        </header>
    )
}