import Image from "next/image";
import React from "react";
import gif from "@assets/sui water.gif";
import tele from "@assets/tele.svg";
import X from "@assets/X svg.svg";
import mail from "@assets/mail.svg";
import Link from "next/link";
type Props = {};

export default function SuiConnectPage({}: Props) {
    return (
        <div className="flex flex-col justify-start items-center relative bg-[#070E22] bg-blend-overlay w-screen h-screen overflow-hidden">
            <Image className=" object-cover w-full h-full" src={gif} alt="" />
            <div className=" absolute inset-0 flex flex-col items-center justify-center pt-[32px]">
                <p className="text-white text-[32px] not-italic font-extrabold fixed top-[32px] leading-[120%] tracking-[-4px] font-Axis">
                    PAY EXTENSION
                </p>
                <button
                    style={{ border: "1px solid rgba(198, 198, 198, 0.25)" }}
                    className="flex p-[22px_48px]  text-[32px] font-[500] font-TWKEverett text-white bg-[rgba(37,27,62,0.75)] backdrop-blur-[12px] rounded-[999px]"
                >
                    Connect Wallet
                </button>
                <div
                    style={{ border: "0.5px solid rgba(147, 147, 147, 0.25)" }}
                    className="p-[16px_64px] h-[64px] backdrop-blur-[12px]  font-TWKEverett flex justify-between items-center rounded-[32px_32px_0px_0px] fixed bottom-0 w-full bg-[rgba(21,29,42,0.75)]"
                >
                    <p className=" text-[16px] font-[500] text-[#FFF] leading-[100%]">
                        Ecommerce Extension powered by{" "}
                        <span className="text-[#67B6FF]">SUI</span>.
                    </p>
                    <div className="flex items-center gap-[24px] text-[16px] font-[400] text-[#89A4BE]">
                        <Image
                            className=" cursor-pointer"
                            width={16}
                            height={16}
                            src={X}
                            alt=""
                        />
                        <Image
                            className=" cursor-pointer"
                            width={16}
                            height={16}
                            src={tele}
                            alt=""
                        />
                        <Image
                            className=" cursor-pointer"
                            width={16}
                            height={16}
                            src={mail}
                            alt=""
                        />
                        <Link href={""}>Term</Link>
                        <Link href={""}>Privacy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
