import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listernCapturing = true) {
    const ref = useRef();

    useEffect(
        function () {
            function handleClick(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    handler();
                }
            }
            document.addEventListener("click", handleClick, listernCapturing);
            return () =>
                document.removeEventListener(
                    "click",
                    handleClick,
                    listernCapturing
                );
        },
        [handler, listernCapturing]
    );

    return ref;
}
