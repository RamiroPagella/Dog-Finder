import { SVGProps } from "react";
import { Oval, OvalProps } from "react-loader-spinner";

export function AttentionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm0-4q.425 0 .713-.288Q13 12.425 13 12V8q0-.425-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8v4q0 .425.288.712q.287.288.712.288Zm0 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"
      />
    </svg>
  );
}

export function FormValidationError(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <g fill="currentColor">
        <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" opacity=".2" />
        <path d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88" />
      </g>
    </svg>
  );
}

export function DogPaw(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M212 80a28 28 0 1 0 28 28a28 28 0 0 0-28-28m0 40a12 12 0 1 1 12-12a12 12 0 0 1-12 12M72 108a28 28 0 1 0-28 28a28 28 0 0 0 28-28m-28 12a12 12 0 1 1 12-12a12 12 0 0 1-12 12m48-32a28 28 0 1 0-28-28a28 28 0 0 0 28 28m0-40a12 12 0 1 1-12 12a12 12 0 0 1 12-12m72 40a28 28 0 1 0-28-28a28 28 0 0 0 28 28m0-40a12 12 0 1 1-12 12a12 12 0 0 1 12-12m23.12 100.86a35.3 35.3 0 0 1-16.87-21.14a44 44 0 0 0-84.5 0A35.25 35.25 0 0 1 69 148.82A40 40 0 0 0 88 224a39.48 39.48 0 0 0 15.52-3.13a64.09 64.09 0 0 1 48.87 0a40 40 0 0 0 34.73-72ZM168 208a24 24 0 0 1-9.45-1.93a80.14 80.14 0 0 0-61.19 0a24 24 0 0 1-20.71-43.26a51.22 51.22 0 0 0 24.46-30.67a28 28 0 0 1 53.78 0a51.27 51.27 0 0 0 24.53 30.71A24 24 0 0 1 168 208"
      />
    </svg>
  );
}

export function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M223 57a58.07 58.07 0 0 0-81.92-.1L128 69.05l-13.09-12.19A58 58 0 0 0 33 139l89.35 90.66a8 8 0 0 0 11.4 0L223 139a58 58 0 0 0 0-82m-11.35 70.76L128 212.6l-83.7-84.92a42 42 0 0 1 59.4-59.4l.2.2l18.65 17.35a8 8 0 0 0 10.9 0l18.65-17.35l.2-.2a42 42 0 1 1 59.36 59.44Z"
      />
    </svg>
  );
}

export function Profile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M21 12a8.958 8.958 0 0 1-1.526 5.016A8.991 8.991 0 0 1 12 21a8.991 8.991 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"
        />
        <path
          fill="currentColor"
          d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9zM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 12 11.75zM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9zM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25zM5.166 17.856l-.719-.214l-.117.392l.267.31zm13.668 0l.57.489l.266-.31l-.117-.393zM9 15.75h6v-1.5H9zm0-1.5a4.752 4.752 0 0 0-4.553 3.392l1.438.428A3.252 3.252 0 0 1 9 15.75zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.752 4.752 0 0 0 15 14.25zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405z"
        />
      </g>
    </svg>
  );
}

export function DogHouse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M256 27.52L25 212.3v41L256 68.48L487 253.3v-41zm0 64L73 237.9V487h94c.1-32.3.8-79.5 10.2-121c5.2-22.7 12.9-43.9 25.4-60c12.6-16.2 30.7-27 53.4-27s40.8 10.8 53.4 27c12.5 16.1 20.2 37.3 25.4 60c9.4 41.5 10.1 88.7 10.2 121h94V237.9zM163.9 198.2a25.03 14.73 15.04 0 1 12.1 2.2a25.03 14.73 15.04 0 1 17.7 14.6h124.6a14.73 25.03 74.96 0 1 17.7-14.6a14.73 25.03 74.96 0 1 12.1-2.2a14.73 25.03 74.96 0 1 17.8 7.8a14.73 25.03 74.96 0 1-13 19.6a25.03 14.73 15.04 0 1 10.7 18.4a25.03 14.73 15.04 0 1-29.9 5.7a25.03 14.73 15.04 0 1-18.1-16.7H196.4a14.73 25.03 74.96 0 1-18.1 16.7a14.73 25.03 74.96 0 1-29.9-5.7a14.73 25.03 74.96 0 1 10.7-18.4a25.03 14.73 15.04 0 1-13-19.6a25.03 14.73 15.04 0 1 17.8-7.8"
      />
    </svg>
  );
}

export function Search(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.5 3C7.701 3 3 7.701 3 13.5S7.701 24 13.5 24c2.54 0 4.868-.901 6.684-2.402l7.109 7.11a1 1 0 0 0 1.414-1.415l-7.109-7.11A10.457 10.457 0 0 0 24 13.5C24 7.701 19.299 3 13.5 3M5 13.5a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0"
      />
    </svg>
  );
}

export const Loader = (props: OvalProps) => {
  return <Oval color="#343a40" secondaryColor="#6c757d" {...props} />;
};

export function CloseButton(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
      />
    </svg>
  );
}

export function HeartFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M240 98a57.63 57.63 0 0 1-17 41l-89.3 90.62a8 8 0 0 1-11.4 0L33 139a58 58 0 0 1 82-82.1l13 12.15l13.09-12.19A58 58 0 0 1 240 98"
      />
    </svg>
  );
}

export function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m13.15 16.15l-3.625-3.625q-.125-.125-.175-.25T9.3 12q0-.15.05-.275t.175-.25L13.15 7.85q.075-.075.163-.112T13.5 7.7q.2 0 .35.138T14 8.2v7.6q0 .225-.15.363t-.35.137q-.05 0-.35-.15"
      />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10.5 16.3q-.2 0-.35-.137T10 15.8V8.2q0-.225.15-.362t.35-.138q.05 0 .35.15l3.625 3.625q.125.125.175.25t.05.275q0 .15-.05.275t-.175.25L10.85 16.15q-.075.075-.162.113t-.188.037"
      />
    </svg>
  );
}

export function Plus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    </svg>
  );
}

export function CheckboxChecked(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M6 26V6h20v20Z"
      />
      <path
        fill="currentColor"
        d="m14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58z"
      />
    </svg>
  );
}

export function Checkbox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M6 26V6h20v20Z"
      />
    </svg>
  );
}

export function DissaproveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
      />
    </svg>
  );
}

export function ApproveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="m2.75 8.75l3.5 3.5l7-7.5"
      />
    </svg>
  );
}
