import React from "react"
import Link from "next/link"
import MobileMenu from "../MobileMenu"
export default function MobileHeader() {
    return (
        <header className="w-full">
            <div  className="flex border-b shadow-sm bg-white justify-between items-center px-3 h-[60px] fixed w-full ">
                <MobileMenu />
                <Link href="/" className="text-lg font-semibold">Import</Link>
                <div>

                </div>
            </div>
        </header>
    )
}