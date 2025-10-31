import React, {useRef} from "react";

export default function CodeInput() {
    
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    function handleInput(e:React.FormEvent<HTMLInputElement>, index: number) {

        const value = e.currentTarget.value;

        console.log(`Input ${index}:`, value);

        if(value && index < inputs.current.length - 1 ) {
            inputs.current[index + 1]?.focus();
        }

        if(value && index > inputs.current.length - 1 ) {
            inputs.current[index - 1]?.focus();
        }

    }

    function backSpace(e:React.FormEvent<HTMLInputElement>, index: number) {
        const value = e.currentTarget.value;

        if (value === "" && index < 0) {
            inputs.current[index - 1]?.focus();
        }

    }

    return (
        <form className="flex gap-3 mb-10">
          {Array(6).fill("").map((_,i) => (
            <input id="code" maxLength={1} key={i} inputMode="numeric" onKeyDown={(e) => {if (e.key === "Backspace") {backSpace(e, i)}}} onInput={(e) => handleInput(e, i)} ref={(el) => {inputs.current[i] = el}} ></input>
          ))}
        </form>
    )
}

