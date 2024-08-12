import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                ' bg-white text-neutral-900 transition duration-200 ease-in-out focus:border-indigo-500 focus:ring-blue-400 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
