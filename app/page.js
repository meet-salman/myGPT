"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const Home = () => {

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API);

  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState(null)

  const submitPrompt = async (e) => {
    e.preventDefault();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    if (input.trim()) {

      setPrompt(input.trim());
      setAnswer(null);
      setInput("");

      const result = await model.generateContent(input);
      const response = result.response;
      const text = response.text();

      setAnswer(text)
    }

  }



  return (
    <>
      <div className="layout">

        <div className="w-[50%]">
          <form className="prompt-form" onSubmit={submitPrompt}>
            <input type="text" className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a prompt here..." />
            <button className="btn"> &#10148; </button>
          </form>
        </div>


        {prompt ?

          <div className="result_box">

            <div className="flex gap-6 items-center">
              <img src="./user.png" alt="logo" width={25} height={25} className="rounded-full p-1 bg-slate-300" />
              <h3 className="prompt"> {prompt} </h3>
            </div>

            <div className="mt-5 flex gap-6 items-start">
              <img src="./logo.png" alt="logo" width={30} height={30} />
              <p className="answer"> {answer ? answer : "Loading..."} </p>
            </div>

          </div>

          :

          <h1 className="head">
            <span className="sp-head"> Hello </span> <br />
            How can I help you today?
          </h1>
        }




      </div>
    </>
  )
}

export default Home