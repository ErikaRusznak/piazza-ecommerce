import React from "react";
import Link from "next/link";
import Image from "next/image";

const LogoComponent = () => {

    return (
        <Link href={"/"}>
            <Image
                src="./icon1.svg"
                alt="icon"
                width={40}
                height={40}
                style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(100%) hue-rotate(100deg)' }}
            />
        </Link>
    )
}

export default LogoComponent;