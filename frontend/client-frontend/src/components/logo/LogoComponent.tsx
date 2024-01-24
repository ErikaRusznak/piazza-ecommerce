import React from "react";
import Link from "next/link";
import Image from "next/image";

const LogoComponent = () => {

    return (
        <Link href={"/"}>
            <Image
                src="./icon.svg"
                alt="icon"
                width={40}
                height={40}
            />
        </Link>
    )
}

export default LogoComponent;