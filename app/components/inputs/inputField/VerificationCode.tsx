import {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  ClipboardEvent,
} from "react";

export default function VerificationCode({
  onSubmit,
  setValueState,
}: {
  onSubmit: (code: string) => void;
  setValueState?: (code: string) => void;
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = (propsCode: string[]) => {
    const fullCode = propsCode.join("");
    onSubmit(fullCode);
  };

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (setValueState) {
        const fullCode = newCode.join("");
        setValueState(fullCode);
      }

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else if (value && index === 5) {
        if (newCode.every((digit) => digit !== "")) {
          handleSubmit(newCode);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];

      if (code[index]) {
        // If current input has a value, clear it
        newCode[index] = "";
        setCode(newCode);
        if (setValueState) {
          setValueState(newCode.join(""));
        }
      } else if (index > 0) {
        // If current input is empty and not first input, clear previous input and move focus
        newCode[index - 1] = "";
        setCode(newCode);
        if (setValueState) {
          setValueState(newCode.join(""));
        }
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Enter" && !code.includes("")) {
      handleSubmit(code);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 8);
    const newCode = [...code];

    [...pastedData].forEach((char, index) => {
      if (index < 8) newCode[index] = char;
    });

    setCode(newCode);

    if (newCode.every((digit) => digit !== "")) {
      handleSubmit(newCode);
    } else {
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <div dir="ltr" className="flex justify-center gap-2">
      {code.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(idx, e.target.value)
          }
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={idx === 0 ? handlePaste : undefined}
          className="w-12 h-14 text-center text-xl font-semibold rounded-lg border-2 border-disable/30 bg-base-card
                focus:border-prime/70 focus:outline-none focus:ring-2 focus:ring-prime-content
                transition-all"
        />
      ))}
    </div>
  );
}
