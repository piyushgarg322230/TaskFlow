import React, { useCallback, useEffect, useState,useRef } from "react";

export default function PasswordGenrator() {
  const upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChar = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChar = "!@#$%^&*()_+";

  const [length, setLength] = useState(16);
  const [edit, setEdit] = useState(""); // Store generated password
  const [isNumber, setNumber] = useState(false);
  const [isUpper, setUpperCheck] = useState(false);
  const [isLower, setLowerCheck] = useState(true);
  const [isSpecial, setSpecialCharacter] = useState(false);
  const userRefd=useRef(null);
  
  const handleCopy = useCallback(() => {
    userRefd.current.select();
    navigator.clipboard.writeText(edit);
    // alert("Password copied!");
  },[edit]);

  // Function to generate password
  const PasswordGenrator = useCallback(() => {
    let charSet = "";
    if (isNumber) charSet += numbers;
    if (isUpper) charSet += upperChar;
    if (isLower) charSet += lowerChar;
    if (isSpecial) charSet += specialChar;

    if (charSet.length === 0) {
      setEdit("Select at least one option!");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }

    setEdit(generatedPassword); // Store password in state
  },[length,isNumber,isUpper,isLower,isSpecial,setEdit]);

  useEffect(()=>{
    PasswordGenrator();
  },[length,isNumber,isLower,isSpecial,isUpper,setEdit]);



  return (
    <div className="p-4 space-y-4">
      {/* Password Field */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Password"
          value={edit}
          readOnly
          ref={userRefd}
          className="border p-2 w-full"
        />
        <button onClick={handleCopy} className="bg-blue-500 text-white p-2 rounded">
          Copy
        </button>
      </div>

      {/* Length Slider */}
      <label className="block">
        Length: {length}
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </label>

      {/* Options */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isNumber}
            onChange={(e) => setNumber(e.target.checked)}
          />
          <span>Include Numbers</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isUpper}
            onChange={(e) => setUpperCheck(e.target.checked)}
          />
          <span>Include Uppercase Letters</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isLower}
            onChange={(e) => setLowerCheck(e.target.checked)}
          />
          <span>Include Lowercase Letters</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isSpecial}
            onChange={(e) => setSpecialCharacter(e.target.checked)}
          />
          <span>Include Special Characters</span>
        </label>
      </div>

      {/* Generate Button */}
      {/* <button
        onClick={PasswordGenrator}
        className="bg-green-500 text-white p-2 rounded w-full"
      >
        Generate Password
      </button> */}
    </div>
  );
}
