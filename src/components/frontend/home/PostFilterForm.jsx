import React from "react";
import { useRef } from "react";
import { useState } from "react";

PostFilterForm.defaultProps = {
  onSubmit: null,
};
export default function PostFilterForm(props) {
  const { onSubmit } = props;
  const [searchName, setSearchName] = useState("");
  const typingTimeoutRef = useRef(null);
  const handleOnChangeSearch = (e) => {
    setSearchName(e.target.value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchName: e.target.value,
      };
      onSubmit(formValues);
    }, 300);
  };
  return (
    <form>
      <input
        type="text"
        value={searchName}
        onChange={handleOnChangeSearch}
        className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
        placeholder="Search"
      />
    </form>
  );
}
