import React, { useEffect, useRef, useState } from "react";
import { data } from './Datas/Data'
import SubSection from "./SubSection";

const MIN_WIDTH_THRESHOLD = 735;

export default function Section1() {
    const Reference = useRef(null);
    const [items, setItems] = useState("4k");
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    const item = data
    const Data = item[0]
    const currentData = Data.childID

    useEffect(() => {
        const handleResize = () => {
            const width = Reference.current.clientWidth;
            console.log(width)
            if (width >= MIN_WIDTH_THRESHOLD && width < "1069") {
                setItems("1069");
            } else if (width < MIN_WIDTH_THRESHOLD) {
                setItems("735");
            } else {
                setItems("4k")
            }

            if (!initialCheckDone) {
                setInitialCheckDone(true);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [initialCheckDone]);

    let k = items === '4k';
    let hd = items === '1069';
    let mp = items === '735';


    if (k) {
        return (
            <>
                <section ref={Reference} style={{ width: "100%" }}>
                    <ul>
                        {currentData
                            .filter((value) => value === 7)
                            .map((id) => (
                                <li key={id}>
                                    <SubSection
                                        key={id}
                                        id={id}
                                        item={item}
                                        items={items}
                                    />
                                </li>
                            ))}
                    </ul>
                </section>
            </>
        );
    }

    if (hd) {
        return (
            <>
                <section ref={Reference} style={{ width: "100%" }}>
                    <ul>
                        {currentData
                            .filter((value) => value === 8)
                            .map((id) => (
                                <li key={id}>
                                    <SubSection
                                        key={id}
                                        id={id}
                                        item={item}
                                        items={items}
                                    />
                                </li>
                            ))}
                    </ul>
                </section>
            </>
        );
    }
    if (mp) {
        return (
            <>
                <section ref={Reference} style={{ width: "100%" }}>
                    <ul>
                        {currentData
                            .filter((value) => value === 9)
                            .map((id) => (
                                <li key={id}>
                                    <SubSection
                                        key={id}
                                        id={id}
                                        item={item}
                                        items={items}
                                    />
                                </li>
                            ))}
                    </ul>
                </section>
            </>
        );
    }


    return (
        <>
            {"bhjnbnjh"}

            <section ref={Reference} style={{ width: "100%" }}>
                { }
            </section>
        </>
    );
}