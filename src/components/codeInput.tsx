import React, {useEffect, useRef} from "react";
import { confirmCode } from "../../services/cognitoService";

export default function CodeInput() {
    
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputs.current[0]?.focus();
    })

    function handleInput(e:React.FormEvent<HTMLInputElement>, index: number) {

        const value = e.currentTarget.value;

        if(value && index < inputs.current.length - 1 ) {
            if (value === " ") {
                inputs.current[index]?.focus()
            } else {
                inputs.current[index + 1]?.focus();
            }
        }
    }

    function handleBackspace(e:React.KeyboardEvent<HTMLInputElement>, index: number) {
        const input = e.currentTarget;

        if (e.key === "Backspace") {
            if (input.value === "" && index > 0) {
                const prevInput = inputs.current[index - 1];
                prevInput?.focus();

                e.preventDefault();
            }
        }
        
    }

    function confirmCode() {
        const code = getCode();

        
    }

    function getCode() {
        const values = inputs.current.map(input => input?.value?.trim() || "" );

        const hasEmpty = values.some((value) => {value === ""});

        if (hasEmpty) {
            return {success: false, message: "Número vacío o invalido"}
        }

        return values.join("");
    }


    return (
        <form className="flex gap-3 mb-10" onSubmit={(e) => e.preventDefault()}>
          {Array(6).fill("").map((_,i) => (
            <input id="code" maxLength={1} key={i} inputMode="numeric" onKeyDown={(e) => handleBackspace(e, i)} onInput={(e) => handleInput(e, i)} ref={(el) => {inputs.current[i] = el}} ></input>
          ))}
        </form>
    )
}

